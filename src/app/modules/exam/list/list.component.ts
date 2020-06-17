import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Demande } from '../../../core/models/demande.model';
import { Exam } from '../../../core/models/exam.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ExamService } from '../../../core/services/exam/exam.service';
import { DetailComponent } from '../detail/detail.component';
import { SaveOrUpdateComponent } from '../save-or-update/save-or-update.component';
import { ModuleService } from '../../../core/services/module/module.service';
import swal from 'sweetalert2';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { StudentComponent } from '../student/student.component';

@Component({
  selector: 'app-exam-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ["name", "module","type","startTime","endTime","launch","actions"];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<Exam>;

  demandeExam: Demande<Exam> = new Demande<Exam>();

  exam: Exam = new Exam();
  resultsLength;
  lang;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listModule: any;
  examForm = new FormGroup({
    name: new FormControl(""),
    type: new FormControl(""),
    module: new FormControl()
  });
  constructor(
    private examService: ExamService,
    private dialog: MatDialog,
    private moduleService:ModuleService,
    private translateService:TranslateService

  ) {}
  ngOnInit() {
    this.lang=this.translateService.getLangs()[0];
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang=event.lang;
      this.search(true);
    });
    this.moduleService.findAll().subscribe(res => {
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
    const name = this.examForm.get("name").value;
    const module = this.examForm.get("module").value;
   const type=this.examForm.get("type").value;

    this.exam.name = name;
    this.exam.module = module;
   this.exam.type=type;
    this.demandeExam.model = this.exam;
    this.demandeExam.page = page;
    this.demandeExam.size = size;

    this.searchByCritere(this.demandeExam);
  }

  searchByCritere(demande: Demande<Exam>) {
    console.log("demandeExam --------", demande);
    this.examService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("exams from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Exam>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.examForm.get("name").setValue("");
    this.examForm.get("module").setValue(null);
    this.examForm.get("type").setValue("");
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
    this.examService.delete(row.id).subscribe(
      response => {
        console.log("response", response);
        this.search(true);
      },
      error => {
        console.log("error", error);
      }
    );
  }
  openDialogDelete(module) {
    let actionDeleted=this.getI18n("ACTION.DELETED");
    let userDeleted= this.getI18n("EXAM.DELETED");
    swal({
      title: this.getI18n("EXAM.DELETE"),
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
          text:userDeleted,
          type: "success",
        });
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
  openDialogStudent(exam){
    const dialogRef = this.dialog.open(StudentComponent, {
      width: "80%",
      data: exam,
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
  openDialogLaunch(exam){
    const  examLanched=this.getI18n('COURSE.LAUNCHED');
    const  examLanchedMSG=this.getI18n('COURSE.LAUNCHED_MESSAGE');
      swal({
        title: this.getI18n('EXAM.LAUNCH'),
        text: this.getI18n('ACTION.CONFIRMATION_MESSAGE'),
        type: 'warning',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.getI18n('ACTION.CONFIRMATION'),
        cancelButtonText: this.getI18n('ACTION.CANCEL_CONFIRMATION'),
        reverseButtons: false,
        focusCancel: true
      }).then(() => this.launch(exam)).then(function () {
        swal({
          title: examLanched,
          text: examLanchedMSG,
          type: 'success'
        });
      }).catch();
    }
    launch(exam) {
      this.examService.launch(exam.id).subscribe((resp) => {
       this.search(true)
      });
    }
}
