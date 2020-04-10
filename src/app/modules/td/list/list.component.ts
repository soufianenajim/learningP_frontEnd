import { Component, OnInit, ViewChild } from "@angular/core";
import { TdService } from "../../../core/services/td/td.service";
import { Td } from "../../../core/models/td.model";
import { Cour } from "../../../core/models/cour.model";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  PageEvent,
  MatDialog
} from "@angular/material";
import { Demande } from "../../../core/models/demande.model";
import { FormGroup, FormControl } from "@angular/forms";
import { CourseService } from "../../../core/services/course/course.service";
import { SaveOrUpdateComponent } from "../save-or-update/save-or-update.component";
import { DetailComponent } from "../detail/detail.component";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ["name", "cour", "module", "action"];

  dataSource: MatTableDataSource<Td>;
  demandeTd: Demande<Td> = new Demande<Td>();

  td: Td = new Td();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  resultsLength;

  listCour: any;

  tdForm = new FormGroup({
    name: new FormControl(""),
    cour: new FormControl()
  });
  constructor(
    private tdService: TdService,
    private courseService: CourseService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.courseService.findAll().subscribe(res => {
      console.log("cours in database -------------------------------", res);
      this.listCour = res;
      this.search(false);
    });
  }

  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const name = this.tdForm.get("name").value;
    const cour = this.tdForm.get("cour").value;
    console.log("cour", cour);
    this.td.name = name;
    this.td.cour = cour;
    this.demandeTd.model = this.td;
    this.demandeTd.page = page;
    this.demandeTd.size = size;
    this.searchByCritere(this.demandeTd);
  }

  searchByCritere(demande: Demande<Td>) {
    console.log("demande", demande);
    this.tdService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("tds from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Td>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.tdForm.get("name").setValue("");
    this.tdForm.get("cour").setValue(null);
    this.search(false);
  }
  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
  }

  openDialog(data) {
    console.log("data", data);
    const dialogRef = this.dialog.open(SaveOrUpdateComponent, {
      width: "80%",
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
    this.tdService.delete(row.id).subscribe(
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
