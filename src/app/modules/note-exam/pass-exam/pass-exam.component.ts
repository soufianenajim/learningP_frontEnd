import { Component, OnInit, Inject, ChangeDetectorRef, AfterViewChecked } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ExamService } from "../../../core/services/exam/exam.service";
import { Question } from "../../../core/models/question.model";
import { NoteExam } from "../../../core/models/note_exam.model";
import { NoteExamService } from "../../../core/services/note-exam/note-exam.service";
import { TranslateService } from "@ngx-translate/core";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";

@Component({
  selector: "app-pass-exam",
  templateUrl: "./pass-exam.component.html",
  styleUrls: ["./pass-exam.component.css"],
})
export class PassExamComponent implements OnInit,AfterViewChecked {
  exam;
  selectedAnswers=[];
  questionCorrect = [];
  isPastTd;
  noteExam: NoteExam;
  questionCorrectSuggestions = new Map();
 user;
  constructor(
    public dialogRef: MatDialogRef<PassExamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private examService: ExamService,
    private noteExamService: NoteExamService,
    private translateService:TranslateService,
    private cdRef: ChangeDetectorRef,
    private tokenStorageService:TokenStorageService
    
  ) {
if(data!=null){
  this.noteExam = data;
  this.exam=data.exam;
  this.user=tokenStorageService.getUser();
  console.log('this.user',this.user);

}
  
   
  }

  ngAfterViewChecked() {
    
    this.cdRef.detectChanges();
  }
  ngOnInit() {
   
  }
  validateExam() {
    console.log("questionCorrectSuggestions",this.questionCorrectSuggestions);
    this.questionCorrect = [];
    this.questionCorrectSuggestions.forEach((value, key) => {
      this.selectedAnswers.push(value[0]);
      if (this.compareQuestionWithChoiceSuggestions(key, value)) {
        this.questionCorrect.push(key);
        
      }
    });
    console.log("selectedAnswers",this.selectedAnswers);
    this.noteExam.user=this.user;
    this.noteExam.exam=this.exam;
    this.noteExam.finished = true;
    this.noteExam.answers=this.selectedAnswers;
    this.noteExam.score =
      (this.questionCorrect.length / this.exam.questions.length) * 100;
    console.log("noteExam", this.noteExam);
    this.noteExamService
      .saveOrUpdate(this.noteExam)
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
    this.validateExam();
  }

}
}
