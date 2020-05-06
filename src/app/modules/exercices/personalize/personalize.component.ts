import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Exercices } from "../../../core/models/exercices.model";
import { ExercicesService } from "../../../core/services/exercices/exercices.service";
import { sharedConstants } from "../../../core/constants";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { map } from "d3";

@Component({
  selector: "app-personalize",
  templateUrl: "./personalize.component.html",
  styleUrls: ["./personalize.component.css"],
})
export class PersonalizeComponent implements OnInit {
  exercices: Exercices;
  isClickSave = false;
  mapQuestionNote=new Map();
  exercicesForm = this.fb.group({
    scale: new FormControl("", [
      Validators.required,
      Validators.min(5),
      Validators.max(100),
    ]),
    questions: this.fb.array([]),
  });
  sum=0;
  private readonly notifier: NotifierService;
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker'
  ];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private exercicesService: ExercicesService,
    public dialogRef: MatDialogRef<PersonalizeComponent>,
    private fb: FormBuilder,
    private translateService:TranslateService,
    notifierService:NotifierService
  ) {
    this.notifier=notifierService;
    this.exercices = data;
    this.buildForm(data);
  }
  buildForm(data){
    this.exercicesForm.get('scale').setValue(data.scale);
    let questions = data.questions;
let index=0;
    if (questions) {
      for (let d of questions) {
        this.sum+=d.note;
        this.mapQuestionNote.set(index++,d.note);
        this.questions.push(
          this.fb.group({
            id:new FormControl(d.id),
            code: new FormControl(d.code),
            name: new FormControl(d.name),
            correctComment: new FormControl(d.correctComment),
            type: new FormControl(d.type),
            startTime: new FormControl(d.startTime),
            endTime: new FormControl(d.endTime),
            note:new FormControl(d.note>0?d.note:"",[Validators.required,Validators.min(0),
              Validators.max(100)])
          })
        );
        
      }
    }
  }
  public get questions(): FormArray {
    return this.exercicesForm.get("questions") as FormArray;
  }


  ngOnInit() {}

  save() {
    this.isClickSave = true;
    const scale = this.exercicesForm.get("scale").value;
    const questions=this.exercicesForm.get("questions").value;
    this.exercices.scale = scale;
    this.exercices.questions=questions;
    if (this.exercicesForm.valid ) {
      if(this.isValideNotes()){
      this.exercicesService.saveOrUpdate(this.exercices).subscribe((resp) => {
        this.successNotifaction();
      },
      (error) => {
        this.erorrNotifaction("GROUP.EXIST");
      });
    }
    else{
     this.erorrNotifaction("EXERCICES.NOTES_QUESTION_INVALID");
    }
    }
  }
  cancel() {
    this.dialogRef.close(false);
  }
  errormptyField(field: string) {
    return (
      this.exercicesForm.get(field).hasError("required") &&
      (this.exercicesForm.get(field).touched || this.isClickSave)
    );
  }
  isFieldRequiredInArray(field: string, index: number) {
    return this.questions.at(index).get(field).hasError('required')
      && (this.questions.at(index).get(field).touched || this.isClickSave);
  }
  invalidDataInArraY(field: string, index: number) {
   
    return   this.questions.at(index).get(field).hasError('min')||this.questions.at(index).get(field).hasError('max');
   
  }
  isValideNotes():boolean{
    const questions:[]=this.exercicesForm.get('questions').value;
    const scale=this.exercicesForm.get('scale').value;
    let sum=0;
    
    questions.forEach((element:any) => {
     sum+=element.note;
    });
    console.log('sum',sum);
    return scale===sum;
  }
  successNotifaction() {
    this.translateService
      .get("GROUP.SAVE_SUCCESS")
      .subscribe((value: string) => {
        this.showNotification("success", value);
        setTimeout(() => {
          this.dialogRef.close(true);
        }, 1000);
      });
  }
  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
  erorrNotifaction(title) {
    this.translateService.get(title).subscribe((value: string) => {
      this.showNotification("error", value);
    });
  }
  onReCalculate(i){
    console.log('i',i);
    const note=this.questions.at(i).get("note").value;
    if(this.mapQuestionNote.has(i)){
      this.sum-=this.mapQuestionNote.get(i);
      this.mapQuestionNote.set(i,note);
      
    }
    else{
      this.mapQuestionNote.set(i,note);
      
    }
    this.sum+=note;

  }
  drop(event: CdkDragDrop<string[]>) {
    const previousQuestion=this.questions.at(event.previousIndex).value;
    const currentQuestion=this.questions.at(event.currentIndex).value;
    this.questions.at(event.previousIndex).setValue(currentQuestion);
    this.questions.at(event.currentIndex).setValue(previousQuestion);
    console.log('event.previousIndex',event.previousIndex);
    console.log('event.previousIndex',event.currentIndex);
    console.log('questions',this.questions);
    
   moveItemInArray(this.questions.value, event.previousIndex, event.currentIndex);
  }
  
}
