import {
  Component,
  OnInit,
  Inject,
  Input,
  Output,
  OnChanges,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from "@angular/forms";
import { Exercices } from "../../../core/models/exercices.model";
import { ExercicesService } from "../../../core/services/exercices/exercices.service";
import { sharedConstants } from "../../../core/constants";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { map } from "d3";
import { EditQuestionComponent } from "./edit-question/edit-question.component";
import { EventEmitter } from "protractor";

@Component({
  selector: "app-personalize",
  templateUrl: "./personalize.component.html",
  styleUrls: ["./personalize.component.css"],
})
export class PersonalizeComponent implements OnInit {
  @Input() exercicesForm: FormGroup;
  @Input() data;
  @Input() isClickSave = false;
  @Input() isClickNext=false;
  mapQuestionNote = new Map();
  // exercicesForm = this.fb.group(
  //   scale: new FormControl("", [
  //     Validators.required,
  //     Validators.min(5),
  //     Validators.max(100),
  //   ]),
  //   questions: this.fb.array([]),
  // });
  exercices: Exercices;
  sum = 0;
  private readonly notifier: NotifierService;

  constructor(
    private dialog: MatDialog,
    private exercicesService: ExercicesService,
    public dialogRef: MatDialogRef<PersonalizeComponent>,
    private fb: FormBuilder,
    private translateService: TranslateService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  buildForm(data) {
    this.exercicesForm.get("scale").setValue(data.scale);
    let questions: any[] = data.questions;

    let index = 0;
    if (questions) {
      questions.sort((a, b) => a.indexNumerator - b.indexNumerator);

      for (let d of questions) {
        this.sum += d.note;
        this.mapQuestionNote.set(index++, d.note);
        this.addInQuestion(d);
      }
      console.log("this.questions", this.questions.value);
    }
  }
  public get questions(): FormArray {
    return this.exercicesForm.get("questions") as FormArray;
  }

  ngOnInit() {
    if (this.data != null) {
      console.log("data", this.data);
      this.buildForm(this.data);
    }
  }

  save() {
    this.isClickSave = true;
    const scale = this.exercicesForm.get("scale").value;
    let questions: any = this.exercicesForm.get("questions").value;

    this.exercices.scale = scale;
    this.exercices.questions = this.rebuildIndexQuestion(questions);

    if (this.exercicesForm.valid) {
      if (this.isValideNotes()) {
        this.exercicesService.saveOrUpdate(this.exercices).subscribe(
          (resp) => {
            this.successNotifaction();
          },
          (error) => {
            this.erorrNotifaction("GROUP.EXIST");
          }
        );
      } else {
        this.erorrNotifaction("EXERCICES.NOTES_QUESTION_INVALID");
      }
    }
  }
  cancel() {
    this.dialogRef.close(false);
  }
  errormptyField(field: string) {
    return (
      this.exercicesForm.get(field).hasError("required") &&
      (this.exercicesForm.get(field).touched || this.isClickSave)
    );
  }
  isFieldRequiredInArray(field: string, index: number) {
    return (
      this.questions.at(index).get(field).hasError("required") &&
      (this.questions.at(index).get(field).touched || this.isClickSave)
    );
  }
  invalidDataInArraY(field: string, index: number) {
    return (
      this.questions.at(index).get(field).hasError("min") ||
      this.questions.at(index).get(field).hasError("max")
    );
  }
  isValideNotes(): boolean {
    const questions: any = this.exercicesForm.get("questions").value;
    const scale = this.exercicesForm.get("scale").value;
    let sum = 0;

    questions.forEach((element: any) => {
      sum += element.note;
    });
    console.log("sum", sum);
    return scale === sum;
  }
  successNotifaction() {
    this.translateService
      .get("EXERCICES.PERSONALIZE_SUCCESS")
      .subscribe((value: string) => {
        this.showNotification("success", value);
        setTimeout(() => {
          this.dialogRef.close(true);
        }, 1000);
      });
  }
  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
  erorrNotifaction(title) {
    this.translateService.get(title).subscribe((value: string) => {
      this.showNotification("error", value);
    });
  }
  onReCalculate(i) {
    console.log("i", i);
    const note = this.questions.at(i).get("note").value;
    if (this.mapQuestionNote.has(i)) {
      this.sum -= this.mapQuestionNote.get(i);
      this.mapQuestionNote.set(i, note);
    } else {
      this.mapQuestionNote.set(i, note);
    }
    this.sum += note;
  }
  drop(event: CdkDragDrop<any[]>) {
    console.log("event",event.item)
    const previousQuestion = this.questions.at(event.previousIndex).value;
    const currentQuestion = this.questions.at(event.currentIndex).value;
    this.questions.at(event.previousIndex).setValue(currentQuestion);
    this.questions.at(event.currentIndex).setValue(previousQuestion);

    moveItemInArray(
      this.questions.value,
      event.previousIndex,
      event.currentIndex
    );
  }


  rebuildIndexQuestion(questions): any {
    let i = 0;
    if (questions) {
      questions.forEach((element) => {
        element.indexNumerator = ++i;
      });
    }
    console.log("questions", questions);
    return questions;
  }

  openDialogQuesiton(row) {
    const dialogRef = this.dialog.open(EditQuestionComponent, {
      width: "80%",
      data: row,
      disableClose: true,
      autoFocus: false,
      maxHeight: "90vh",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.id === null) {
        result.indexNumerator = this.questions.value.length + 1;
        this.addInQuestion(result);
      }
    });
  }
  addInQuestion(d) {
    this.questions.push(
      this.fb.group({
        id: new FormControl(d.id),
        code: new FormControl(d.code),
        name: new FormControl(d.name),
        correctComment: new FormControl(d.correctComment),
        indexNumerator: new FormControl(d.indexNumerator),
        suggestions: new FormControl(d.suggestions),
        note: new FormControl(d.note > 0 ? d.note : "", [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
        ]),
      })
    );
  }

  errorEmptyQuestion() {
    return this.questions.value.length === 0 && this.isClickSave;
  }
}
