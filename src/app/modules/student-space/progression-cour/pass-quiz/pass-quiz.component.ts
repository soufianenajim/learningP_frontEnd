import { Component, OnInit, Inject } from '@angular/core';
import { Question } from '../../../../core/models/question.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProgressionCourService } from '../../../../core/services/progression_cour/progression-cour.service';
import { TranslateService } from '@ngx-translate/core';
import { ProgressionCour } from '../../../../core/models/progression_cour.model';
import moment from 'moment';
@Component({
  selector: 'app-pass-quiz',
  templateUrl: './pass-quiz.component.html',
  styleUrls: ['./pass-quiz.component.css']
})
export class PassQuizComponent implements OnInit {
  quiz;
  questionCorrect = [];
  isPastTd;
  progressionCour:ProgressionCour;
  questionCorrectSuggestions = new Map();
 availabeToBeStarted=false;
  constructor(
    public dialogRef: MatDialogRef<PassQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private progressionCourService: ProgressionCourService,
    private translateService:TranslateService
  ) {
if(data!=null){
  
  this.progressionCour = data;
  this.quiz=data.quiz;
  console.log('quiz',this.quiz)
  console.log('moment().isSameOrAfter(this.quiz.startDateTime)',moment().isSameOrAfter(this.quiz.startDateTime));
}
  
   
  }

  
  ngOnInit() {
   
  }
  validateQuiz() {
   
    this.questionCorrect = [];
    this.questionCorrectSuggestions.forEach((value, key) => {
      if (this.compareQuestionWithChoiceSuggestions(key, value)) {
        this.questionCorrect.push(key);
      }
    });

    this.progressionCour.quizFinished = true;
    this.progressionCour.scoreQuiz =
      (this.questionCorrect.length / this.quiz.questions.length) * 100;
      console.log('progressionCour',this.progressionCour.scoreQuiz)
    this.progressionCourService
      .saveOrUpdate(this.progressionCour)
      .subscribe((resp) => {
        this.dialogRef.close(true);
      });
  }
  compareQuestionWithChoiceSuggestions(
    question: Question,
    suggestions
  ): boolean {
    let suggestionCorrect = [];

    question.suggestions.forEach((element) => {
      if (element.correct) {
        suggestionCorrect.push(element);
      }
    });
    return JSON.stringify(suggestionCorrect) == JSON.stringify(suggestions);
  }

onFinished(event){
  if(event){
    this.validateQuiz();
  }

}


}
