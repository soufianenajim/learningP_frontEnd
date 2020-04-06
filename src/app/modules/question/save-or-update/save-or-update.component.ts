import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, FormArray } from "@angular/forms";
import { QuestionService } from "../../../core/services/question/question.service";
import { ChapterService } from "../../../core/services/chapter/chapter.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Question } from "../../../core/models/question.model";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  listChapitre: any;
  questionForm: FormGroup;

  idQuestion = null;
  isEdit = false;
  constructor(
    private questionService: QuestionService,
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
    this.suggestions.removeAt(i);
  }

  onSubmit() {
    console.log(this.questionForm.value);
  }
}