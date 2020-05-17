import { Component, OnInit, Inject, Input, ɵConsole } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ModuleService } from "../../../core/services/module/module.service";
import { MatDialogRef, MAT_DIALOG_DATA, MatStepper } from "@angular/material";
import { Exercices } from "../../../core/models/exercices.model";
import { ExercicesService } from "../../../core/services/exercices/exercices.service";
import { QuestionService } from "../../../core/services/question/question.service";
import { CourseService } from "../../../core/services/course/course.service";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { Exam } from "../../../core/models/exam.model";
import { Cour } from "../../../core/models/cour.model";
import { ExamService } from "../../../core/services/exam/exam.service";
import moment from 'moment';

@Component({
  selector: "app-save-or-update-ex",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateExComponent implements OnInit {
  listModule: any;
  idExercices = null;
  scale;
  isEdit = false;
  listCour = [];
  sum = 0;
  invalidQuestion = false;
  @Input() isExam = false;
  @Input() exam;
  isNotTd = false;
  minDateTime = new Date();

  firstFormGroup = this._formBuilder.group({
    name: new FormControl("", [
      Validators.required,
      this.noWhitespaceValidator,
    ]),
    type: new FormControl("", Validators.required),
    module: new FormControl(null, Validators.required),
    cour: new FormControl(null, Validators.required),
    startTime: new FormControl(moment().format(), Validators.required),
    endTime: new FormControl("", Validators.required),
  });

  secondFormGroup = this._formBuilder.group({
    scale: new FormControl("", [
      Validators.required,
      Validators.min(5),
      Validators.max(100),
    ]),
    questions: new FormControl("", Validators.required),
  });
  isClickNext1 = false;
  examOrExercices: any;
  validSecondForm = false;
  isClicNextSecondForm = false;
  private readonly notifier: NotifierService;
  constructor(
    private moduleService: ModuleService,
    private exercicesService: ExercicesService,
    private examService: ExamService,
    private questionSerivce: QuestionService,
    private tokenStorageService: TokenStorageService,
    public dialogRef: MatDialogRef<SaveOrUpdateExComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private courService: CourseService,
    private _formBuilder: FormBuilder,
    private translateService: TranslateService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    if (data !== null) {
      this.examOrExercices = data;
      this.buildForm(data);
    } else {
      this.examOrExercices = new Exercices();
    }
  }
  buildForm(data) {
    console.log("data", data);
    this.idExercices = data.id;
    this.scale = data.scale;
    const name = data.name;

    let type, cour, module;
    if (this.isExam) {
      type = "EXAM";
      cour = new Cour();
      module = data.module;
    } else {
      type = data.type;
      this.isNotTd = type === "QUIZ";
      cour = data.cour;
      module = data.cour.module;
    }
    const startTime = data.startDateTime;
    const endTime = data.endDateTime;
    const scale = data.scale;
    const questions = data.questions;
    this.firstFormGroup.get("name").setValue(name);
    this.firstFormGroup.get("module").setValue(module);
    this.firstFormGroup.get("cour").setValue(cour);
    this.firstFormGroup.get("type").setValue(type);
    this.firstFormGroup.get("startTime").setValue(startTime);
    this.firstFormGroup.get("endTime").setValue(endTime);
    this.secondFormGroup.get("scale").setValue(scale);
    this.secondFormGroup.get("questions").setValue(questions);
    questions.forEach((element) => {
      this.sum += element.note;
    });

    this.onSelectModule();
  }

  ngOnInit() {
    console.log('moment(item.publishDate).date()',new Date(moment().add(10,'minutes').format()))
    console.log('date',new Date());
    if (this.isExam) {
      this.isNotTd = true;
      if (this.exam) {
        this.buildForm(this.exam);
      } else {
        this.examOrExercices = new Exam();
      }
    }
    const user = this.tokenStorageService.getUser();
    this.moduleService.findByProfessor(user.id).subscribe((resp: any) => {
      this.listModule = resp;
    });
  }
  save() {
    if (!this.isExam) {
      this.exercicesService
        .saveOrUpdate(this.examOrExercices)
        .subscribe((resp) => {
          if (this.examOrExercices.type === "TD")
            this.successNotifaction("EXERCICES.TD_SAVE_SUCCESS");
          else {
            this.successNotifaction("EXERCICES.QUIZ_SAVE_SUCCESS");
          }
        });
    } else {
      this.examService.saveOrUpdate(this.examOrExercices).subscribe((resp) => {
        this.successNotifaction("EXERCICES.EXAM_SAVE_SUCCESS");
      });
    }
  }
  cancel() {
    this.dialogRef.close(false);
  }
  compareModule(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  onSelectModule() {
    if (!this.isExam) {
      const module = this.firstFormGroup.get("module").value;
      console.log("module", module);
      this.courService
        .findByModuleAndNotLaunchd(module.id)
        .subscribe((resp: any) => {
          this.listCour = resp;
        });
    }
  }
  nextForm1(stepper: MatStepper) {
    this.isClickNext1 = true;
    const name = this.firstFormGroup.get("name").value;
    const startTime = this.firstFormGroup.get("startTime").value;
    const endTime = this.firstFormGroup.get("endTime").value;
    this.examOrExercices.name = name;
    if (!this.isExam) {
      const cour = this.firstFormGroup.get("cour").value;
      const type = this.firstFormGroup.get("type").value;
      if (type === "TD") {
        this.firstFormGroup.get("startTime").setValue(new Date());
        this.firstFormGroup.get("endTime").setValue(new Date());
        this.examOrExercices.startDateTime = null;
        this.examOrExercices.endDateTime = null;
      }else{
        this.examOrExercices.startDateTime = startTime;
        this.examOrExercices.endDateTime = endTime;
      }
      this.examOrExercices.cour = cour;
      this.examOrExercices.type = type;
    } else {
      const module = this.firstFormGroup.get("module").value;
      this.firstFormGroup.get("cour").setValue(new Cour());
      this.firstFormGroup.get("type").setValue("EXAM");
      this.examOrExercices.module = module;
      this.examOrExercices.startDateTime = startTime;
    this.examOrExercices.endDateTime = endTime;
    }

    console.log('!this.isExam',!this.isExam);
    console.log('this.firstFormGroup.valid',this.firstFormGroup.valid);
    if (!this.isExam) {
      if (this.firstFormGroup.valid) {
        this.exercicesService.isExist(this.examOrExercices).subscribe(
          (resp) => {
            stepper.next();
          },
          (error) => {
            this.examOrExercices.type === "TD"
              ? this.erorrNotifaction("EXERCICES.TD_EXIST")
              : this.erorrNotifaction("EXERCICES.QUIZ_EXIST");
          }
        );
      }
    } else {
      stepper.next();
    }
  }
  nextForm2(stepper: MatStepper) {
    this.isClicNextSecondForm = true;
    const scale = this.secondFormGroup.get("scale").value;
    const questions = this.secondFormGroup.get("questions").value;
    if (
      this.secondFormGroup.valid &&
      this.sum === scale &&
      !this.invalidQuestion
    ) {
      questions.sort(function (a: any, b: any) {
        return a.indexNumerator - b.indexNumerator;
      });
      this.examOrExercices.scale = scale;
      this.examOrExercices.questions = questions;

      stepper.next();
    }

    console.log("formGroup", this.secondFormGroup.value);
    //   stepper.next();
  }
  public noWhitespaceValidator(control: FormControl) {
    if (control.value === "") {
      return null;
    }
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
  errormptyFieldForm1(field: string) {
    return (
      this.firstFormGroup.get(field).hasError("required") &&
      (this.firstFormGroup.get(field).touched || this.isClickNext1)
    );
  }
  invalidDataForm1(field: string) {
    return (
      this.firstFormGroup.get(field).hasError("whitespace") &&
      !this.firstFormGroup.get(field).hasError("required") &&
      (this.firstFormGroup.get(field).touched || this.isClickNext1)
    );
  }
  erorrNotifaction(error) {
    this.translateService.get(error).subscribe((value: string) => {
      this.showNotification("error", value);
    });
  }
  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
  successNotifaction(msg) {
    this.translateService.get(msg).subscribe((value: string) => {
      this.showNotification("success", value);
      setTimeout(() => {
        this.dialogRef.close(true);
      }, 1000);
    });
  }
  onChangeNote(event) {
    this.sum = event;
  }
  onChangeInvalidQuestion(event) {
    console.log("event", event);
    this.invalidQuestion = event;
  }
  onSelectType() {
    const type = this.firstFormGroup.get("type").value;
    this.isNotTd = type === "QUIZ";
  }
    minEnDatTime(){
      const startTime=this.firstFormGroup.get('startTime').value
      return moment(startTime).add(10,'minutes').format();
    }
}
