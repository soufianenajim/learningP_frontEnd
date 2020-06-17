import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input,
} from "@angular/core";
import { MatTableDataSource, MatDialog, MatPaginator } from "@angular/material";
import { Exam } from "../../../../core/models/exam.model";
import { Demande } from "../../../../core/models/demande.model";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { ExamService } from "../../../../core/services/exam/exam.service";
import { Module } from "../../../../core/models/module.model";


@Component({
  selector: "app-future-tense-exam",
  templateUrl: "./future-tense-exam.component.html",
  styleUrls: ["./future-tense-exam.component.css"],
})
export class FutureTenseExamComponent implements OnInit {
  displayedColumns: string[] = ["name", "module", "type", "remainingTime"];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<Exam>;

  demandeExam: Demande<Exam> = new Demande<Exam>();

  exam: Exam = new Exam();
  resultsLength;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() professor;
  @Input() student;
  listModule: any;
  isLoadingResults = false;

  DAY;
  DAYS;
  HOUR;
  HOURS;
  MINUTE;
  MINUTES;
  SECOND;
  SECONDS;
  currentDate;
  constructor(
    private examService: ExamService,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit() {
    console.log('professor',this.professor);
    this.getTimeString();
    this.search(false);
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getTimeString();
      this.search(true);
    });
  }
  ngAfterViewChecked() {
    this.currentDate = new Date();
    this.cdRef.detectChanges();
  }
  getTimeString() {
    this.DAY = this.getI18n("EXAM.DAY");
    this.DAYS = this.DAY.concat("s");
    this.HOUR = this.getI18n("EXAM.HOUR");
    this.HOURS = this.HOUR.concat("s");
    this.MINUTE = this.getI18n("EXAM.MINUTE");
    this.MINUTES = this.MINUTE.concat("s");
    this.SECOND = this.getI18n("EXAM.SECOND");
    this.SECONDS = this.SECOND.concat("s");
  }
  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    this.exam.afterCurrentDate = true;
   
    this.exam.professor=this.professor;
    this.exam.student=this.student;
    this.demandeExam.model = this.exam;
    this.demandeExam.page = page;
    this.demandeExam.size = size;
    this.demandeExam.sortField = "startDateTime";
    this.demandeExam.setSortOrder("asc");

    this.searchByCritere(this.demandeExam);
  }

  searchByCritere(demande: Demande<Exam>) {
    this.examService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("exams from database afak ---------------", resp);
      this.isLoadingResults = true;
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Exam>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }

  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
  }

  getI18n(name): string {
    let i18;
    this.translateService.get(name).subscribe((value: string) => {
      i18 = value;
    });
    return i18;
  }
  secondsToHms(d) {
    // console.log('new Date(d).getTime()',new Date(d).getTime())
    let time = (new Date(d).getTime() - this.currentDate.getTime()) / 1000;
    time = Number(time);
    var day = Math.floor(time / 86400);
    var h = Math.floor((time / 3600) % 24);
    var m = Math.floor((time % 3600) / 60);
    var s = Math.floor((time % 3600) % 60);
    var dayDisplay =
      day > 0
        ? day + (day == 1 ? " " + this.DAY + ", " : " " + this.DAYS + " , ")
        : "";
    var hDisplay =
      h > 0
        ? h + (h == 1 ? " " + this.HOUR + ", " : " " + this.HOURS + " , ")
        : "";
    var mDisplay =
      m > 0
        ? m + (m == 1 ? " " + this.MINUTE + ", " : " " + this.MINUTES + " , ")
        : "";
    var sDisplay =
      s > 0 ? s + (s == 1 ? " " + this.SECOND + ", " : " " + this.SECONDS) : "";
    return dayDisplay + hDisplay + mDisplay + sDisplay;
  }
}
