import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Cour } from '../../../core/models/cour.model';
import { Demande } from '../../../core/models/demande.model';
import { FormGroup, FormControl } from '@angular/forms';
import { CourseService } from '../../../core/services/course/course.service';
import { ModuleService } from '../../../core/services/module/module.service';
import { SaveOrUpdateComponent } from '../save-or-update/save-or-update.component';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ["name", "module", "action"];

  dataSource: MatTableDataSource<Cour>;
  demandeCour: Demande<Cour> = new Demande<Cour>();

  cour: Cour = new Cour();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  resultsLength;

  listModule: any;

  courForm = new FormGroup({
    name: new FormControl(""),
    module: new FormControl()
  });
  constructor(
    private courService: CourseService,
    private moduleseService: ModuleService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.moduleseService.findAll().subscribe(res => {
      console.log("modules in database -------------------------------", res);
      this.listModule = res;
      this.search(false);
    });
  }

  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const name = this.courForm.get("name").value;
    const module = this.courForm.get("module").value;
    console.log("module", module);
    this.cour.name = name;
    this.cour.module = module;
    this.demandeCour.model = this.cour;
    this.demandeCour.page = page;
    this.demandeCour.size = size;
    this.searchByCritere(this.demandeCour);
  }

  searchByCritere(demande: Demande<Cour>) {
    console.log("demande", demande);
    this.courService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("cours from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Cour>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.courForm.get("name").setValue("");
    this.courForm.get("module").setValue(null);
    this.search(false);
  }
  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
  }

  openDialog(data) {
    console.log("data", data);
    const dialogRef = this.dialog.open(SaveOrUpdateComponent, {
      width: "90%",
      autoFocus: false,
      maxHeight: "90vh",
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
  
  delete(row) {
    this.courService.delete(row.id).subscribe(
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
