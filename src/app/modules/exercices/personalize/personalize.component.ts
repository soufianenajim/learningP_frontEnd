import {
  Component,
  OnInit,
  Inject,
  Input,
  Output,
  OnChanges,
  EventEmitter,
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
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { map } from "d3";
import { EditQuestionComponent } from "./edit-question/edit-question.component";
import { Question } from "../../../core/models/question.model";

@Component({
  selector: "app-personalize",
  templateUrl: "./personalize.component.html",
  styleUrls: ["./personalize.component.css"],
})
export class PersonalizeComponent implements OnInit {
  @Input() exercicesForm: FormGroup;
  @Input() data;
  @Input() isClickSave = false;
  @Input() isClickNext = false;
  @Output() changeNote = new EventEmitter<any>();
  @Output() invalidQuestion = new EventEmitter<boolean>();
  @Input() isExam=false;
  mapQuestionNote = new Map();

  exercices: Exercices;
  sum = 0;
  questionsValue:Question[];

  constructor(
    private dialog: MatDialog,
    private exercicesService: ExercicesService,
    private fb: FormBuilder
  ) {}

  buildForm(data) {
    this.exercicesForm.get("scale").setValue(data.scale);
    this.exercicesForm.get("questions").setValue(data.questions);
    this.questionsValue = data.questions;
    for (let d of this.questionsValue) {
      this.sum += d.note;
    }
   
  }
 
  ngOnInit() {
    console.log("data", this.data);
    if (this.data!=undefined && this.data.id !== undefined) {
     
      this.buildForm(this.data);
    }
  }

  errormptyField(field: string) {
    return (
      this.exercicesForm.get(field).hasError("required") &&
      (this.exercicesForm.get(field).touched || this.isClickSave)
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

    onChangeQuestion(event) {
    this.exercicesForm.get("questions").setValue(event);
  }
  onChangeNote(event) {
    this.sum = event;
    this.changeNote.emit(event);
  }
  onChangeInvalidQuestion(event) {
    this.invalidQuestion.emit(event);
  }
}
