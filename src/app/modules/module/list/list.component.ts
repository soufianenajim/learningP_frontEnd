import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { UserService } from "../../../core/services/user/user.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Module } from "../../../core/models/module.model";
import { Demande } from "../../../core/models/demande.model";
import { ModuleService } from "../../../core/services/module/module.service";
import { DetailComponent } from "../detail/detail.component";
import { SaveOrUpdateComponent } from "../save-or-update/save-or-update.component";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
import { TranslateService } from "@ngx-translate/core";
import swal from "sweetalert2";

@Component({
  selector: "app-module-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  @Input() isTeacher = false;
  displayedColumns: string[] = ["name", "professeur", "group", "actions"];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<Module>;

  demandeModule: Demande<Module> = new Demande<Module>();

  module: Module = new Module();
  resultsLength;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listProfessor;
  idOrganization;
  teacher;
  moduleForm = new FormGroup({
    name: new FormControl(""),
    prof: new FormControl(),
  });
  constructor(
    private userService: UserService,
    private moduleService: ModuleService,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private translateService: TranslateService
  ) {}
  ngOnInit() {
    const user = this.tokenStorage.getUser();
    if (this.isTeacher) {
      this.teacher = user;
      this.search(false);
    }else{
      this.idOrganization = user.organization.id;
      this.userService
        .findAllProfessorByOrga(this.idOrganization)
        .subscribe((resp) => {
          this.listProfessor = resp;
  
          this.search(false);
        });
    }
    
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
    this.module.professor =this.isTeacher?this.teacher: professeur;
    this.module.idOrganization = this.idOrganization;
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

  openDialogDetail(module) {
   
    const dialogRef = this.dialog.open(DetailComponent, {
      width: "60%",
      data: module,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(
        "result mn dialog detail afakom rkzo m3ana   -----------",
        result
      );
    });
  }
  openDialog(module) {
    if(module)
    module.isTeacher=this.isTeacher;
    const dialogRef = this.dialog.open(SaveOrUpdateComponent, {
      width: "60%",
      data: module,
      disableClose: true,
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.search(false);
      }

      console.log("The dialog was closed");
    });
  }
  delete(row) {
    this.moduleService.delete(row.id).subscribe(
      (response) => {
        console.log("response", response);
        this.search(true);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
  calculate(module){
    console.log('module',module)
    this.moduleService.calculate(module).subscribe(
      (response) => {
        console.log("response", response);
        this.search(true);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
  getFullName(row) {
    return row ? row.lastName + " " + row.firstName : "---";
  }
  getGroup(row) {
    return row ? row.name : "---";
  }
  openDialogDelete(module) {
    let actionDeleted = this.getI18n("ACTION.DELETED");
    let userDeleted = this.getI18n("MODULE.DELETED");
    swal({
      title: this.getI18n("MODULE.DELETE"),
      text: this.getI18n("ACTION.CONFIRMATION_MESSAGE"),
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: this.getI18n("ACTION.CONFIRMATION"),
      cancelButtonText: this.getI18n("ACTION.CANCEL_CONFIRMATION"),
      reverseButtons: false,
      focusCancel: true,
    })
      .then(() => this.delete(module))
      .then(function () {
        swal({
          title: actionDeleted,
          text: userDeleted,
          type: "success",
        });
      })
      .catch();
  }
  openDialogCalculate(module){
    // let actionDeleted = this.getI18n("ACTION.DELETED");
    // let userDeleted = this.getI18n("MODULE.DELETED");
    swal({
      title: this.getI18n("MODULE.CALCULATE")+ "?",
      text: this.getI18n("ACTION.CONFIRMATION_MESSAGE"),
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: this.getI18n("ACTION.CONFIRMATION"),
      cancelButtonText: this.getI18n("ACTION.CANCEL_CONFIRMATION"),
      reverseButtons: false,
      focusCancel: true,
    })
      .then(() => this.calculate(module))
      .then(function () {
        // swal({
        //   title: actionDeleted,
        //   text: userDeleted,
        //   type: "success",
        // });
      })
      .catch();
  }
  getI18n(name): string {
    let i18;
    this.translateService.get(name).subscribe((value: string) => {
      i18 = value;
    });
    return i18;
  }
}
