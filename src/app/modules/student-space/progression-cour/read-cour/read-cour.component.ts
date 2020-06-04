import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatStepper } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProgressionCour } from "../../../../core/models/progression_cour.model";
import { ProgressionCourService } from "../../../../core/services/progression_cour/progression-cour.service";
import { ExercicesService } from "../../../../core/services/exercices/exercices.service";
import { Question } from "../../../../core/models/question.model";
import { Suggestion } from "../../../../core/models/suggestion.model";
import { AttachmentFile } from "../../../../modules/course/save-or-update/save-or-update.component";
import { environment } from "../../../../../environments/environment";

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
  td ;
  quiz;
  progressionCour: ProgressionCour;
  questionCorrectSuggestions: Map<Question, Suggestion[]> = new Map();
  questionCorrect = [];
  isPastTd = false;
  isPastQuiz = false;
  isPastCour=false;
  quizFinished = false;
  namePath;
  attachmentPath;
  url= environment.baseUrl + "/cour";
  listAttachment: AttachmentFile[] = [];
  constructor(
    public dialogRef: MatDialogRef<ReadCourComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private progressionCourService: ProgressionCourService,
    private exercicesService: ExercicesService
  ) {
    console.log("data", data);
    this.cour = data.cour;
    if (data.cour.attachmentFiles) {
      console.log('data.attachmentFiles',data.attachmentFiles);
      for (let attachment of data.cour.attachmentFiles) {
        let uri=this.url+'/load/'+this.cour.id+"/"+attachment.fileName;
        this.listAttachment.push(new AttachmentFile(attachment.fileName,attachment.attachmentPath,uri));
        console.log('listAttachment',this.listAttachment)
      }
    }
    this.progressionCour = data;
    this.quizFinished = data.quizFinished;
    this.isPastCour=data.courFinished;
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
    
      this.exercicesService.findByCourAndType(this.cour.id,"TD").subscribe((resp: any) => {
    console.log('resp',resp);
        this.td= resp;
        this.isPastCour=true;
        stepper.next();  
      });
    }
    
  
  
  nextForm2(stepper: MatStepper) {
    this.exercicesService.findByCourAndType(this.cour.id,"QUIZ").subscribe((resp: any) => {
         console.log('resp',resp);
          this.quiz= resp;
          this.isPastCour=true;
          stepper.next();  
        });
   
  }
  validateCour(){
    console.log('validateCour');
    if (!this.progressionCour.courFinished) {
      this.progressionCour.courFinished = true;
      this.progressionCour.progression = 50;
      this.progressionCourService
        .saveOrUpdate(this.progressionCour)
        .subscribe((resp) => {
          this.exercicesService.findByCourAndType(this.cour.id,"TD").subscribe((resp: any) => {
            this.td = resp;
           this.isPastCour=true;
            
          });
        });
    } 
     
    
  }
  validateTd() {
    this.questionCorrect = [];
    this.questionCorrectSuggestions.forEach((value, key) => {
      if (this.compareQuestionWithChoiceSuggestions(key, value)) {
        this.questionCorrect.push(key);
      }
    });
    this.isPastTd = true;
    if (!this.progressionCour.tdFinished) {
      this.progressionCour.tdFinished = true;
      this.progressionCour.progression = 100;
      this.progressionCourService
        .saveOrUpdate(this.progressionCour)
        .subscribe((resp) => {});
    }
  }
  // validateQuiz() {
  //   this.questionCorrect = [];
  //   this.questionCorrectSuggestions.forEach((value, key) => {
  //     if (this.compareQuestionWithChoiceSuggestions(key, value)) {
  //   this.questionCorrect.push(key);
  //     }
  //   });
  //   this.isPastQuiz = true;
  //   if (!this.progressionCour.quizFinished) {
  //     this.progressionCour.quizFinished = true;
  //     this.progressionCour.scoreQuiz =
  //       (this.questionCorrect.length / this.quiz.questions.length) * 100;
  //     this.progressionCour.progression = 100;
  //     this.progressionCourService
  //       .saveOrUpdate(this.progressionCour)
  //       .subscribe((resp) => {
  //         this.dialogRef.close(true);
  //       });
  //   } else {
  //     this.dialogRef.close(true);
  //   }
  // }

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
  cancel() {
    this.dialogRef.close(true);
  }
  // onFinished(event){
  //   if(event){
  //     this.validateQuiz();
  //   }
  // }
}
