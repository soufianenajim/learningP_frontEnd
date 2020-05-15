import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ExamService } from "../../../core/services/exam/exam.service";
import { Question } from "../../../core/models/question.model";
import { ProgressionModule } from "../../../core/models/progression_module.model";
import { ProgressionModuleService } from "../../../core/services/progression_module/progression-module.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-pass-exam",
  templateUrl: "./pass-exam.component.html",
  styleUrls: ["./pass-exam.component.css"],
})
export class PassExamComponent implements OnInit {
  exam;
  questionCorrect = [];
  isPastTd;
  progressionModule: ProgressionModule;
  questionCorrectSuggestions = new Map();
  HOUR:String;
  HOURS:String;
  MINUTE:String;
  MINUTES:String;
  SECOND:String;
  SECONDS:String;
  constructor(
    public dialogRef: MatDialogRef<PassExamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private examService: ExamService,
    private progressionModuleService: ProgressionModuleService,
    private translateService:TranslateService
  ) {
    console.log('data',data);
    this.progressionModule = data;
    this.examService.findByModule(data.module.id).subscribe((resp: any) => {
      this.exam = resp[0];
      console.log('exam',new Date(this.exam.endDateTime).getTime() - new Date(this.exam.startDateTime).getTime());
     this.timeLeft=(new Date(this.exam.endDateTime).getTime() - new Date(this.exam.startDateTime).getTime())/1000;
     this.startTimer();
    });
  }
  timeLeft: number ;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else{
        this.validateExam();
      }
    },1000)
  }

  ngOnInit() {
    this.HOUR=this.getI18n('EXAM.HOUR');
    this.HOURS=this.HOUR.concat('s');
    this.MINUTE=this.getI18n('EXAM.MINUTE');
    this.MINUTES=this.MINUTE.concat('s');
    this.SECOND=this.getI18n('EXAM.SECOND');
    this.SECONDS=this.SECOND.concat('s');
   // this.startTimer()
  }
  validateExam() {
    clearInterval(this.interval);
    this.questionCorrect = [];
    this.questionCorrectSuggestions.forEach((value, key) => {
      if (this.compareQuestionWithChoiceSuggestions(key, value)) {
        this.questionCorrect.push(key);
      }
    });

    this.progressionModule.examFinished = true;
    this.progressionModule.noteExam =
      (this.questionCorrect.length / this.exam.questions.length) * 100;
    console.log("progressionModule", this.progressionModule);
    this.progressionModuleService
      .saveOrUpdate(this.progressionModule)
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
