import { Component, OnInit, ViewChild } from "@angular/core";
import { TdService } from "../../../core/services/td/td.service";
import { Td } from "../../../core/models/td.model";
import { Cour } from "../../../core/models/cour.model";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  PageEvent
} from "@angular/material";
import { Demande } from "../../../core/models/demande.model";
import { FormGroup, FormControl } from "@angular/forms";
import { CourseService } from "../../../core/services/course/course.service";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ["name", "cour","module" ,"action"];

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
  constructor(private tdService: TdService,private courseService:CourseService) {}
  ngOnInit() {
    this.courseService.findAll().subscribe(res => {
      console.log("res", res);
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
    this.td.name = name;
    this.td.cour = cour;
    this.demandeTd.model = this.td;
    this.demandeTd.page = page;
    this.demandeTd.size = size;
    this.searchByCritere(this.demandeTd);
  }

  searchByCritere(demande: Demande<Td>) {
    console.log('demande',demande)
    this.tdService.searchByCritere(demande).subscribe((resp: any) => {
      console.log('resp',resp)
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    console.log('')
      this.paginator.pageSize = 5;
      this.paginator.pageIndex = 0;
  }
  reset() {

    this.tdForm.get('name').setValue("");
    this.tdForm.get('cour').setValue(null);
    this.search(false);
  }
  refreshDataTable(){
    console.log('this.paginator',this.paginator);
    this.search(true);
  }
}



