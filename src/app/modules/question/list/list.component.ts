import {
  EventEmitter,
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  SkipSelf,
  AfterViewChecked,
} from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { Question } from "../../../core/models/question.model";
import { Demande } from "../../../core/models/demande.model";
import { FormGroup, FormControl } from "@angular/forms";
import { QuestionService } from "../../../core/services/question/question.service";
import { DetailComponent } from "../detail/detail.component";
import { SaveOrUpdateComponent } from "../save-or-update/save-or-update.component";
import { SelectionModel } from "@angular/cdk/collections";
import { TranslateService } from "@ngx-translate/core";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
import { ModuleService } from "../../../core/services/module/module.service";
import { ExamService } from "../../../core/services/exam/exam.service";
import { ExercicesService } from "../../../core/services/exercices/exercices.service";
import swal from "sweetalert2";


@Component({
  selector: "app-question-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ["name", "code", "correctComment", "actions"];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<Question>;

  demandeQuestion: Demande<Question> = new Demande<Question>();

  question: Question = new Question();
  resultsLength;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listChapitre;
  listModule = [];
  listExam = [];
  listQuiz = [];
  listExercices = [];
  questionForm = new FormGroup({
    name: new FormControl(""),
    code: new FormControl(""),
    module:new FormControl(null),
    exercices:new FormControl(null),
    exam:new FormControl(null),
    quiz:new FormControl(null),

  });
  selection = new SelectionModel<any>(true, []);
  checkedInit=true;
  constructor(
    private questionService: QuestionService,
    private dialog: MatDialog,
    private translateService:TranslateService,
    private moduleService: ModuleService,
    private examService: ExamService,
    private exercicesService: ExercicesService,
    private tokenStorageService: TokenStorageService,
    
  ) {}
  ngOnInit() {
    const user = this.tokenStorageService.getUser();
    this.moduleService.findByProfessor(user.id).subscribe((resp: any) => {
      this.listModule = resp;
    });
    this.search(false);
  }
 
  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const name = this.questionForm.get("name").value;
    const code = this.questionForm.get("code").value;
    const exam= this.questionForm.get("exam").value;
    const quiz= this.questionForm.get("quiz").value;
    const exercices= this.questionForm.get("exercices").value;
    this.question.name = name;
    this.question.code = code;
    this.question.exam=exam!=null && exam!=""?exam:null
    this.question.exercices=exercices!=null && exercices!=""?exercices:null;

    this.demandeQuestion.model = this.question;
    this.demandeQuestion.page = page;
    this.demandeQuestion.size = size;

    this.searchByCritere(this.demandeQuestion);
  }

  searchByCritere(demande: Demande<Question>) {
    console.log("demandeQuestion --------", demande);
    this.questionService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("questions from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Question>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.questionForm.get("name").setValue("");
    this.questionForm.get("code").setValue("");
    this.questionForm.get("exam").setValue(null);
    this.questionForm.get("quiz").setValue(null);
    this.questionForm.get("exercices").setValue(null);
    this.questionForm.get("module").setValue(null);
     this.search(false);
  }
  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
  }

  openDialogDetail(row) {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: "60%",
      data: row,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(
        "result mn dialog detail afakom rkzo m3ana   -----------",
        result
      );
    });
  }
  openDialog(data) {
    console.log("data", data);
    const dialogRef = this.dialog.open(SaveOrUpdateComponent, {
      width: "80%",
      data: data,
      disableClose: true,
      autoFocus: false,
      maxHeight: "90vh",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.search(false);
      }

      console.log("The dialog was closed");
    });
  }
  delete(row) {
    this.questionService.delete(row.id).subscribe(
      (response) => {
        console.log("response", response);
        this.search(true);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

 


  getRoleName(role: String) {
    const rolei18 = role.replace("ROLE_", "ROLE.");
    let roleName;
    this.translateService.get(rolei18).subscribe((value: string) => {
        roleName = value;
        return value
    });
    return roleName;
}
  compareModule(c1: any, c2: any): boolean {
  return c1 && c2 ? c1.id === c2.id : c1 === c2;
   }
   onSelectModule(){
     const module=this.questionForm.get("module").value;
     this.examService.findByModule(module.id).subscribe((resp:any)=>{
       this.listExam=resp;
      
       
     })
   }
   openDialogDelete(module) {
    let actionDeleted=this.getI18n("ACTION.DELETED");
    let userDeleted= this.getI18n("QUESTION.DELETED");
    swal({
      title: this.getI18n("QUESTION.DELETE"),
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
  

}
