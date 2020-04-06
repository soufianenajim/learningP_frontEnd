import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Demande } from '../../../core/models/demande.model';
import { Quiz } from '../../../core/models/quiz.model';
import { FormGroup, FormControl } from '@angular/forms';
import { QuizService } from '../../../core/services/quiz/quiz.service';
import { DetailComponent } from '../detail/detail.component';
import { SaveOrUpdateComponent } from '../save-or-update/save-or-update.component';
import { CourseService } from '../../../core/services/course/course.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ["name", "cour","actions"];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<Quiz>;

  demandeQuiz: Demande<Quiz> = new Demande<Quiz>();

  quiz: Quiz = new Quiz();
  resultsLength;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listCour: any;
  quizForm = new FormGroup({
    name: new FormControl(""),
    cour: new FormControl()
  });
  constructor(
    private quizService: QuizService,
    private dialog: MatDialog,
    private courService:CourseService

  ) {}
  ngOnInit() {
    this.courService.findAll().subscribe(res => {
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
    const name = this.quizForm.get("name").value;
    const cour = this.quizForm.get("cour").value;
   

    this.quiz.name = name;
    this.quiz.cour = cour;
   
    this.demandeQuiz.model = this.quiz;
    this.demandeQuiz.page = page;
    this.demandeQuiz.size = size;

    this.searchByCritere(this.demandeQuiz);
  }

  searchByCritere(demande: Demande<Quiz>) {
    console.log("demandeQuiz --------", demande);
    this.quizService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("quizs from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Quiz>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.quizForm.get("name").setValue("");
    this.quizForm.get("cour").setValue(null);
    this.search(false);
  }
  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
  }

  openDialogDetail(row) {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: "80%",
      data: row,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(
        "result mn dialog detail afakom rkzo m3ana   -----------",
        result
      );
    });
  }
  openDialog(data) {
    const dialogRef = this.dialog.open(SaveOrUpdateComponent, {
      width: "80%",
      data: data,
      disableClose: true,
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.search(false);
      }

      console.log("The dialog was closed");
    });
  }
  delete(row) {
    this.quizService.delete(row.id).subscribe(
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
