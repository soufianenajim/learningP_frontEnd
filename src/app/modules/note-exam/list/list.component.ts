import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewChecked,
  Input,
  EventEmitter,
  Output
} from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { Demande } from "../../../core/models/demande.model";
import { NoteExam } from "../../../core/models/note_exam.model";
import { FormGroup, FormControl } from "@angular/forms";
import { NoteExamService } from "../../../core/services/note-exam/note-exam.service";

import { ModuleService } from "../../../core/services/module/module.service";
import swal from "sweetalert2";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
import moment from "moment";
import { PassExamComponent } from "../pass-exam/pass-exam.component";
import { debounceTime, switchMap } from "rxjs/operators";
import { UserService } from "../../../core/services/user/user.service";
import { throwError } from "rxjs";
import { DetailComponent } from '../detail/detail.component';
@Component({
  selector: "app-list-note-exam",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit, AfterViewChecked {
 @Input()exam;
 @Output() onCancel=new EventEmitter<boolean>();
 isFromExamList=false;
  displayedColumns: string[] = [
    "exam",
    "module",
    "type",
    "score",
    "remainingTime",
    "launch",
    "statut"
  ];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<NoteExam>;

  demandeNoteExam: Demande<NoteExam> = new Demande<NoteExam>();

  noteExam: NoteExam = new NoteExam();
  resultsLength;
  user;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  lang = "en";
  listModule: any;
  DAY;
  DAYS;
  HOUR;
  HOURS;
  MINUTE;
  MINUTES;
  SECOND;
  SECONDS;
  currentDate;
  students=[];
  studentInput$ = new EventEmitter<string>();
  studentLoading = false;
  i=0;
  noteExamForm = new FormGroup({
    name: new FormControl(""),
    type: new FormControl(""),
    module: new FormControl(),
    student: new FormControl(null),
  });
  constructor(
    private noteExamService: NoteExamService,
    private dialog: MatDialog,
    private moduleService: ModuleService,
    private translateService: TranslateService,
    private tokenStorageService: TokenStorageService,
    private cdRef: ChangeDetectorRef,
    private userService:UserService
  ) {}
  ngAfterViewChecked() {
    this.currentDate = new Date();
    this.cdRef.detectChanges();
  }
  ngOnInit() {
 this.loadStudent();
    if(this.exam){
      this.displayedColumns=[
          "student",
          "exam",
          "statut",
          "score",
          "action"
      ];
      this.isFromExamList=true;
      this.search(false);
    }
    if(!this.isFromExamList){
      this.getTimeString();
      this.user = this.tokenStorageService.getUser();
      const groupId = this.user.groups[0].id;
      this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
        this.lang = event.lang;
        this.getTimeString();
        this.search(true);
      });
  
      this.moduleService.findByGroup(groupId).subscribe((resp) => {
        this.listModule = resp;
        console.log("module---", resp);
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
    const name = this.noteExamForm.get("name").value;
    const module = this.noteExamForm.get("module").value;
    const type = this.noteExamForm.get("type").value;
    const user=this.noteExamForm.get("student").value;
    this.noteExam.module = module;
    this.noteExam.type = type;
    this.noteExam.user = !this.isFromExamList?this.user:user;
    this.noteExam.exam=this.isFromExamList?this.exam:null;
    this.demandeNoteExam.model = this.noteExam;
    this.demandeNoteExam.page = page;
    this.demandeNoteExam.size = size;

    this.searchByCritere(this.demandeNoteExam);
  }

  searchByCritere(demande: Demande<NoteExam>) {
    console.log("demandeNoteExam --------", demande);
    this.noteExamService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("noteExams from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<NoteExam>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.noteExamForm.get("name").setValue("");
    this.noteExamForm.get("module").setValue(null);
    this.noteExamForm.get("type").setValue("");
    this.clearStudent();
    this.search(false);
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
  secondsToHms(d) {
    // console.log('new Date(d).getTime()',new Date(d).getTime())
    
    let time = (new Date(d).getTime() - this.currentDate.getTime()) / 1000;
    time = Number(time);
    var day = Math.floor(time / 86400);
    var h = Math.floor((time / 3600)%24);
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
  readyToStar(startDate){
    return (moment(this.currentDate).add(5,"minutes")).isSameOrAfter(moment(startDate)) && (moment(this.currentDate)).isSameOrBefore(moment(startDate));
  }
  openExam(data) {
      const  dialogRef = this.dialog.open(PassExamComponent, {
          width: "90%",
          data: data,
          disableClose: true,
          autoFocus: false,
          maxHeight: "90vh",
        });
        dialogRef.afterClosed().subscribe((result) => {
          console.log("result", result);
          if (result) {
            this.search(false);
          }
        });
  }
  isEndTimeSupToCurrent(date){
    if(this.i<2){
      this.i++;
      console.log('this.currentDate',this.currentDate)
      console.log('date',date);
      console.log('moment(date).isSameOrAfter(moment(this.currentDate))',moment(date).isSameOrAfter(moment(this.currentDate)));
    }
    
    return moment(date).isSameOrAfter(moment(this.currentDate));
  }
  clearStudent() {
    this.students = [];
    this.noteExamForm.get('student').setValue(null);
  }
  public compareFn(a, b): boolean {
    return false;
  }
  private loadStudent() {
    this.studentInput$
      .pipe(
        debounceTime(200),
        switchMap(term => {
        //  this.noteExamForm.get('student').setValue(term);
          return this.userService.findbyNameContainingByExam(term,this.exam.id);
        })
      )
      .subscribe((items:any) => {
        console.log("items",items);
       if(items)
        this.students=items.map((i) => { i.fullName = i.firstName + ' ' + i.lastName; return i; })
         

      }, (err) => {
        this.students = [];
        return throwError(err);
      });
  }
  openDialogShowScore(element){
    console.log('element',element);
      const  courLanched=this.getI18n('COURSE.LAUNCHED');
      const  courLanchedMSG=this.getI18n('COURSE.LAUNCHED_MESSAGE');
        swal({
          title: this.getI18n('EXAM.USER_SHOW_SCORE'),
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
        }).then(() => this.showScore(element)).then(function () {
          swal({
            title: courLanched,
            text: courLanchedMSG,
            type: 'success'
          });
        }).catch();
      }
      
showScore(element){
  console.log('element',element);
  element.showScore=true;
  this.noteExamService.saveOrUpdate(element).subscribe(resp=>{
    this.search(true);
  })
}
cancel(){
  this.onCancel.emit(true);
}
valideDates(startDate,endDate){
 const conditionStart=(moment(startDate)).isSameOrAfter(moment(this.currentDate).add(5,"minutes")); 
const conditioEnd=moment(endDate).isSameOrAfter(moment(this.currentDate));
 return conditionStart &&conditioEnd;
}
openDialogDetail(data){
console.log('data',data);
  const  dialogRef = this.dialog.open(DetailComponent, {
    width: "90%",
    data: data,
    disableClose: true,
    autoFocus: false,
    maxHeight: "90vh",
  });
  dialogRef.afterClosed().subscribe((result) => {
    console.log("result", result);
    if (result) {
      this.search(false);
    }
  });
}
getScore(row){
  let score=0;
  const scale=row.exam.scale;
  score=(row.score*row.exam.scale)/100;
  return score+"/"+scale;
}

}
