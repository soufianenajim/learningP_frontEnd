import { Component, OnInit, Input, Output,EventEmitter, AfterViewChecked } from "@angular/core";
import { Suggestion } from "../../../../../core/models/suggestion.model";
import { Question } from "../../../../../core/models/question.model";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-td-or-quiz",
  templateUrl: "./td-or-quiz.component.html",
  styleUrls: ["./td-or-quiz.component.css"],
})
export class TdOrQuizComponent implements OnInit ,AfterViewChecked{
  @Input() tdOrQuiz;
  @Input() questionCorrectSuggestions;
  @Input() questionCorrect;
  @Input() isPastTdorQuiz;
  @Input() quizFinished;
  @Input() isNotTd=false;
  @Output() onFinished =new EventEmitter<boolean>();
  timeLeft: number ;
  interval;
  HOUR:String;
  HOURS:String;
  MINUTE:String;
  MINUTES:String;
  SECOND:String;
  SECONDS:String;
  isChecked=false;
  constructor(private translateService:TranslateService) {
  }

  ngOnInit() {
  

 
  }
  ngAfterViewChecked(){
    if(this.isNotTd &&this.tdOrQuiz &&!this.isChecked){
      console.log('tdOrQuiz',this.tdOrQuiz);
      this.isChecked=true;
      this.HOUR=this.getI18n('EXAM.HOUR');
      this.HOURS=this.HOUR.concat('s');
      this.MINUTE=this.getI18n('EXAM.MINUTE');
      this.MINUTES=this.MINUTE.concat('s');
      this.SECOND=this.getI18n('EXAM.SECOND');
      this.SECONDS=this.SECOND.concat('s');
      console.log('tdOrQuiz',this.tdOrQuiz);
      this.timeLeft=(new Date(this.tdOrQuiz.endDateTime).getTime() - new Date(this.tdOrQuiz.startDateTime).getTime())/1000;
      this.startTimer();
     
    }
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

  isCorrect(question) {
    return this.questionCorrect.indexOf(question) > -1;
  }
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else{
        clearInterval(this.interval);
        this.onFinished.emit(true)
      }
    },1000)
  }
  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ' '+this.HOUR+', ' : ' '+this.HOURS+' , ') : "";
    var mDisplay = m > 0 ? m + (m == 1 ? ' '+this.MINUTE+', ' : ' '+this.MINUTES+' , ') : "";
    var sDisplay = s > 0 ? s + (s == 1 ? ' '+this.SECOND+', ' : ' '+this.SECONDS):"";
    return hDisplay + mDisplay + sDisplay; 
}
getI18n(name): string {
  let i18;
  this.translateService.get(name).subscribe((value: string) => {
    i18 = value;
  });
  return i18;
}
}
