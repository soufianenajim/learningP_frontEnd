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
  quiz;
  progressionCour: ProgressionCour;
  questionCorrectSuggestions: Map<Question, Suggestion[]> = new Map();
  questionCorrect = [];
  isPastTd = false;
  isPastQuiz=false;
  constructor(
    public dialogRef: MatDialogRef<ReadCourComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private progressionCourService: ProgressionCourService,
    private tdService: TdService
  ) {
  
    this.cour = data.cour;
    this.quiz=data.cour.quiz;
    this.progressionCour = data;
    this.isPastTd=data.courFinished;
    this.isPastQuiz=data.quizFinished;
    
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
        console.log("tds", resp);
        stepper.next();
      });
    }
  }
  nextForm2(stepper: MatStepper) {
         stepper.next();
  }
  validateTd(){
    this.questionCorrect=[];
    this.questionCorrectSuggestions.forEach((value, key) => {
      if (this.compareQuestionWithChoiceSuggestions(key, value)) {
        this.questionCorrect.push(key);
      }
    });
    this.isPastTd = true;
    if (!this.progressionCour.tdFinished) {
      this.progressionCour.tdFinished = true;
      this.progressionCour.progression = 60;
      this.progressionCourService.saveOrUpdate(this.progressionCour).subscribe((resp) => {
      
        });
    }


  }
  validateQuiz(){
    this.questionCorrect=[];
    this.questionCorrectSuggestions.forEach((value, key) => {
      if (this.compareQuestionWithChoiceSuggestions(key, value)) {
        this.questionCorrect.push(key);
      }
    });
    this.isPastQuiz = true;
    if (!this.progressionCour.quizFinished) {
      this.progressionCour.quizFinished = true;
      this.progressionCour.progression = 100;
      this.progressionCourService.saveOrUpdate(this.progressionCour).subscribe((resp) => {
      
        });
    }


  }
  

  compareQuestionWithChoiceSuggestions(question: Question, suggestions ): boolean {
  
    let suggestionCorrect = [];

    question.suggestions.forEach((element) => {
      if (element.correct) {
        suggestionCorrect.push(element);
      }
    });
      return JSON.stringify(suggestionCorrect) == JSON.stringify(suggestions);
  }
 
  }
