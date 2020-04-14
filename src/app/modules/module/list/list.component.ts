import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { UserService } from "../../../core/services/user/user.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Module } from "../../../core/models/module.model";
import { Demande } from "../../../core/models/demande.model";
import { ModuleService } from "../../../core/services/module/module.service";
import { DetailComponent } from "../detail/detail.component";
import { SaveOrUpdateComponent } from "../save-or-update/save-or-update.component";

@Component({
  selector: "app-module-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ["name", "professeur","level","branch", "actions"];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<Module>;

  demandeModule: Demande<Module> = new Demande<Module>();

  module: Module = new Module();
  resultsLength;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listProfessor;
  moduleForm = new FormGroup({
    name: new FormControl(""),
    prof: new FormControl()
  });
  constructor(
    private userService: UserService,
    private moduleService: ModuleService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.userService.findAllProfessor().subscribe(resp => {
      console.log("list professor --------", resp);
      this.listProfessor = resp;
      this.search(false);
    });
  }
  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const name = this.moduleForm.get("name").value;
    const professeur = this.moduleForm.get("prof").value;

    this.module.name = name;
    this.module.user = professeur;

    this.demandeModule.model = this.module;
    this.demandeModule.page = page;
    this.demandeModule.size = size;

    this.searchByCritere(this.demandeModule);
  }

  searchByCritere(demande: Demande<Module>) {
    console.log("demandeModule --------", demande);
    this.moduleService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("modules from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Module>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.moduleForm.get("name").setValue("");
    this.moduleForm.get("prof").setValue(null);
    this.search(false);
  }
  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
  }


  openDialogDetail(row){
    const dialogRef = this.dialog.open(DetailComponent, {
      width: "60%",
      data: row,
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
     console.log('result mn dialog detail afakom rkzo m3ana   -----------',result);
  
    });
  }
  openDialog(data) {
    console.log("data", data);
    const dialogRef = this.dialog.open(SaveOrUpdateComponent, {
      width: "60%",
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.search(false);
      }
      
      console.log("The dialog was closed");
    });

  }
   delete(row) {
    this.moduleService.delete(row.id).subscribe(
      response => {
        console.log("response", response);
        this.search(true);
      },
      error => {
        console.log("error", error);
      }
    );
  }
}

