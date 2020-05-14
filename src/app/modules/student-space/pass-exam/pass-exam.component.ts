import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExamService } from '../../../core/services/exam/exam.service';
import { Question } from '../../../core/models/question.model';
import { ProgressionModule } from 'src/app/core/models/progression_module.model';
import { ProgressionModuleService } from '../../../core/services/progression_module/progression-module.service';

@Component({
  selector: 'app-pass-exam',
  templateUrl: './pass-exam.component.html',
  styleUrls: ['./pass-exam.component.css']
})
export class PassExamComponent implements OnInit {
exam;
questionCorrect=[]
isPastTd;
progressionModule:ProgressionModule;
questionCorrectSuggestions=new Map();
  constructor(public dialogRef: MatDialogRef<PassExamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private examService:ExamService,
    private progressionModuleService:ProgressionModuleService) {
      this.progressionModule=data;
      this.examService.findByModule(data.module.id).subscribe((resp:any)=>{
        this.exam=resp[0];
      });
     }

  ngOnInit() {
  }
  validateExam() {
    this.questionCorrect = [];
    this.questionCorrectSuggestions.forEach((value, key) => {
      if (this.compareQuestionWithChoiceSuggestions(key, value)) {
    this.questionCorrect.push(key);
      }
    });
  
    
      this.progressionModule.noteExam =
        (this.questionCorrect.length / this.exam.questions.length) * 100;
        console.log('progressionModule',this.progressionModule)
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

}
