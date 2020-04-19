import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatStepper } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProgressionCour } from "../../../../core/models/progression_cour.model";
import { ProgressionCourService } from "../../../../core/services/progression_cour/progression-cour.service";
import { TdService } from "../../../../core/services/td/td.service";
import { Question } from "../../../../core/models/question.model";
import { Suggestion } from "../../../../core/models/suggestion.model";
import { element } from "protractor";

@Component({
  selector: "app-read-cour",
  templateUrl: "./read-cour.component.html",
  styleUrls: ["./read-cour.component.css"],
})
export class ReadCourComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  cour;
  tds = [];
  progressionCour: ProgressionCour;
  questionCorrectSuggestions: Map<Question, Suggestion[]> = new Map();
  questionCorrect = [];
  isPassTd = false;
  constructor(
    public dialogRef: MatDialogRef<ReadCourComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private progressionCourService: ProgressionCourService,
    private tdService: TdService
  ) {
    console.log("data", data);
    this.cour = data.cour;
    this.progressionCour = data;
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required],
    });
  }
  nextForm1(stepper: MatStepper) {
    if (!this.progressionCour.courFinished) {
      this.progressionCour.courFinished = true;
      this.progressionCour.progression = 30;
      this.progressionCourService
        .saveOrUpdate(this.progressionCour)
        .subscribe((resp) => {
          this.tdService.findByCour(this.cour.id).subscribe((resp: any) => {
            this.tds = resp;
            console.log("resp", resp);
            stepper.next();
          });
        });
    } else {
      this.tdService.findByCour(this.cour.id).subscribe((resp: any) => {
        this.tds = resp;
        console.log("resp", resp);
        stepper.next();
      });
    }
  }
  nextForm2(stepper: MatStepper) {
    this.questionCorrectSuggestions.forEach((value, key) => {
      if (this.compareQuestionWithChoiceSuggestions(key, value)) {
        this.questionCorrect.push(key);
      }
    });
    console.log("questionCorrect", this.questionCorrect);
    this.isPassTd = true;
    // stepper.next();
  }
  addToCorrect(suggestion, question) {
    if (this.questionCorrectSuggestions.has(question)) {
      let suggestions: Suggestion[] = this.questionCorrectSuggestions.get(
        question
      );
      suggestions.push(suggestion);
    } else {
      let suggestions = [];
      suggestions.push(suggestion);
      this.questionCorrectSuggestions.set(question, suggestions);
    }
    console.log(
      "this.questionCorrectSuggestions",
      this.questionCorrectSuggestions
    );
  }
  deleteFromCorrect(suggestion, question) {
    if (this.questionCorrectSuggestions.has(question)) {
      let suggestions: Suggestion[] = this.questionCorrectSuggestions.get(
        question
      );
      const index = suggestions.indexOf(suggestion);
      if (index > -1) {
        suggestions.splice(index, 1);
      }
    }
  }
  compareQuestionWithChoiceSuggestions(
    question: Question,
    suggestions
  ): boolean {
    console.log("");
    let suggestionCorrect = [];
    question.suggestions.forEach((element) => {
      if (element.correct) {
        suggestionCorrect.push(element);
      }
    });
   

    return JSON.stringify(suggestionCorrect) == JSON.stringify(suggestions);
  }
  isCorrect(question) {
    return this.questionCorrect.indexOf(question) > -1;
  }
}
