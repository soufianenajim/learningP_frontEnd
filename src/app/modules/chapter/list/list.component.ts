import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Chapitre } from '../../../core/models/chapitre.model';
import { Demande } from '../../../core/models/demande.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ChapterService } from '../../../core/services/chapter/chapter.service';
import { CourseService } from '../../../core/services/course/course.service';
import { SaveOrUpdateComponent } from '../save-or-update/save-or-update.component';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ["name", "cour", "action"];

  dataSource: MatTableDataSource<Chapitre>;
  demandeChapitre: Demande <Chapitre> = new Demande<Chapitre>();

  chapter: Chapitre = new Chapitre();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  resultsLength;

  listCour: any;

  chapterForm = new FormGroup({
    name: new FormControl(""),
    cour: new FormControl()
  });
  constructor(
    private chapterService: ChapterService,
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
    const name = this.chapterForm.get("name").value;
    const cour = this.chapterForm.get("cour").value;
    console.log("cour", cour);
    this.chapter.name = name;
    this.chapter.cour = cour;
    this.demandeChapitre.model = this.chapter;
    this.demandeChapitre.page = page;
    this.demandeChapitre.size = size;
    this.searchByCritere(this.demandeChapitre);
  }

  searchByCritere(demande: Demande<Chapitre>) {
    console.log("demande", demande);
    this.chapterService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("chapters from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Chapitre>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.chapterForm.get("name").setValue("");
    this.chapterForm.get("cour").setValue(null);
    this.search(false);
  }
  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
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
    this.chapterService.delete(row.id).subscribe(
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
