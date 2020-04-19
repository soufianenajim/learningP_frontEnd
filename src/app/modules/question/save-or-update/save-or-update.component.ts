import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, FormArray } from "@angular/forms";
import { QuestionService } from "../../../core/services/question/question.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Question } from "../../../core/models/question.model";
import { SuggestionService } from "../../../core/services/suggestion/suggestion.service";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  questionForm: FormGroup;

  idQuestion = null;
  isEdit = false;
  question;
  constructor(
    private questionService: QuestionService,
    private suggestionService:SuggestionService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.questionForm = this.fb.group({
      name: new FormControl(""),
      code: new FormControl(""),
      correctComment: new FormControl(""),
      suggestions: this.fb.array([]),
    });
    if (data !== null) {
      this.isEdit = true;
      this.idQuestion = data.id;
      this.question=data;
      this.buildForm(data);
    }
  }
  buildForm(data) {
    this.questionForm.get("name").setValue(data.name);
    this.questionForm.get("code").setValue(data.code);
    this.questionForm.get("correctComment").setValue(data.correctComment);
    let suggestions = data.suggestions;
    if (suggestions) {
      for (let d of data.suggestions) {
        console.log("d",d);
        this.suggestions.push(
          this.fb.group({
            id: new FormControl(d.id),
            name: new FormControl(d.name),
            correct: new FormControl(d.correct),
          })
        );
      }
    }
  }
  ngOnInit() {}
  save() {
    console.log("fomr", this.questionForm.value);
    const name = this.questionForm.get("name").value;
    const code = this.questionForm.get("code").value;
    const correctComment = this.questionForm.get("correctComment").value;
    const suggestions = this.questionForm.get("suggestions").value;
    let question = new Question();
    question.id = this.idQuestion;
    question.name = name;
    question.code = code;
    question.correctComment = correctComment;
    question.suggestions = suggestions;
    question.td=this.question.td;
    question.quiz=this.question.quiz;
    question.exam=this.question.exam;
    this.questionService.saveOrUpdate(question).subscribe((resp) => {
      console.log("response  ----", resp);
      this.dialogRef.close(true);
    });
  }
  cancel() {
    this.dialogRef.close(false);
  }
  compareQuestion(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  public get suggestions(): FormArray {
    return this.questionForm.get("suggestions") as FormArray;
  }

  newSuggestion(): FormGroup {
    return this.fb.group({
      id: new FormControl(null),
      name: new FormControl(""),
      correct: new FormControl(false),
    });
  }

  addSuggestions() {
    this.suggestions.push(this.newSuggestion());
  }

  removeSuggestion(i: number) {
    if (this.isEdit) {
      const id = this.suggestions.at(i).value.id;
      if (id != null) {
        this.suggestionService.delete(id).subscribe((resp) => {
          this.suggestions.removeAt(i);
        });
      } else {
        this.suggestions.removeAt(i);
      }
    } else {
      this.suggestions.removeAt(i);
    }
   
  }

  onSubmit() {
    console.log(this.questionForm.value);
  }
}
