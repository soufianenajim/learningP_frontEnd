import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ModuleService } from "../../../core/services/module/module.service";
import { MatDialogRef, MAT_DIALOG_DATA, MatStepper } from "@angular/material";
import { Exercices } from "../../../core/models/exercices.model";
import { ExercicesService } from "../../../core/services/exercices/exercices.service";
import { QuestionService } from "../../../core/services/question/question.service";
import { CourseService } from "../../../core/services/course/course.service";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
 
  listModule: any;
  idExercices = null;
  scale;
  isEdit = false;
  listCour = [];
  
  firstFormGroup = this._formBuilder.group({
    name: new FormControl("",[Validators.required,this.noWhitespaceValidator]),
    type: new FormControl("",Validators.required),
    module: new FormControl(null,Validators.required),
    cour: new FormControl(null,Validators.required),
    startTime: new FormControl("",Validators.required),
    endTime: new FormControl("",Validators.required),
  });
 
  secondFormGroup = this._formBuilder.group({
    scale: new FormControl("", [
      Validators.required,
      Validators.min(5),
      Validators.max(100),
    ]),
    questions: this._formBuilder.array([],Validators.required),
  });
  isClickNext1=false;
  exercices=new Exercices();
  validSecondForm=false;
  isClicNextSecondForm=false;
  private readonly notifier: NotifierService;
  constructor(
    private moduleService: ModuleService,
    private exercicesService: ExercicesService,
    private questionSerivce: QuestionService,
    private tokenStorageService:TokenStorageService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private courService: CourseService,
    private _formBuilder: FormBuilder,
    private translateService:TranslateService,
    notifierService: NotifierService
  ) {
    this.notifier=notifierService;
    if (data !== null) {
      this.exercices=data;
      console.log('this.exercices',this.exercices)
      this.buildForm(data);
      // this.questionSerivce.findByExercices(data.id).subscribe((resp) => {
       
      //   this.isEdit = true;
      //  this.buildForm(data);
       
      // });
    }
  }
buildForm(data){
  console.log('data',data)
  this.idExercices = data.id;
  this.scale=data.scale
  const name = data.name;
  const module = data.cour.module;
  const type=data.type;
 const cour=data.cour;
 const startTime=data.startDateTime;
 const endTime=data.endDateTime;
 const scale =data.scale;
 const questions=data.questions;
  this.firstFormGroup.get("name").setValue(name);
  this.firstFormGroup.get("module").setValue(module);
  this.firstFormGroup.get("cour").setValue(cour);
  this.firstFormGroup.get("type").setValue(type);
  this.firstFormGroup.get("startTime").setValue(startTime);
  this.firstFormGroup.get("endTime").setValue(endTime);
  this.secondFormGroup.get("scale").setValue(scale);
  
  this.onSelectModule();
}
  ngOnInit() {

     const user = this.tokenStorageService.getUser();
    this.moduleService.findByProfessor(user.id).subscribe((resp: any) => {
      this.listModule = resp;
    });
  }
  save() {
   this.exercicesService.saveOrUpdate(this.exercices).subscribe(resp=>{
    if(this.exercices.type==="TD")     
       this.successNotifaction("EXERCICES.TD_SAVE_SUCCESS");
       else{
        this.successNotifaction("EXERCICES.QUIZ_SAVE_SUCCESS");
       }
})
    
  }
  cancel() {
    this.dialogRef.close(false);
  }
  compareModule(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  onSelectModule() {
    const module = this.firstFormGroup.get("module").value;
    console.log('module',module);
    this.courService.findByModuleAndNotLaunchd(module.id).subscribe((resp:any) => {
      this.listCour=resp;
    });
  }
  nextForm1(stepper: MatStepper){
    this.isClickNext1=true;
    const name = this.firstFormGroup.get("name").value;
    const cour = this.firstFormGroup.get("cour").value;
    const type=this.firstFormGroup.get("type").value;
    const startTime=this.firstFormGroup.get("startTime").value;
    const endTime=this.firstFormGroup.get("endTime").value;
    this.exercices.name = name;
    this.exercices.cour=cour;
    this.exercices.type=type;
    this.exercices.startDateTime=startTime;
    this.exercices.endDateTime=endTime;
    
   if(this.firstFormGroup.valid){
     this.exercicesService.isExist(this.exercices).subscribe(
      (resp) => {
        stepper.next();
      },
      (error) => {
        this.exercices.type==="TD"?this.erorrNotifaction("EXERCICES.TD_EXIST"):this.erorrNotifaction("EXERCICES.QUIZ_EXIST");
      }   
     )
    

   }
   
  }
  nextForm2(stepper: MatStepper){
    this.isClicNextSecondForm=true;
   
    if(this.secondFormGroup.valid){
      const scale=this.secondFormGroup.get('scale').value;
      const questions=this.secondFormGroup.get('questions').value;
      this.exercices.scale=scale;
      this.exercices.questions=questions;
      stepper.next();
    }
    
    console.log('formGroup',this.secondFormGroup.value);
 //   stepper.next();
  }
  public noWhitespaceValidator(control: FormControl) {
    if (control.value === "") {
      return null;
    }
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
  errormptyFieldForm1(field: string) {
    return (
      this.firstFormGroup.get(field).hasError("required") &&
      (this.firstFormGroup.get(field).touched || this.isClickNext1)
    );
  }
  invalidDataForm1(field: string) {
    return (
      this.firstFormGroup.get(field).hasError("whitespace") &&
      !this.firstFormGroup.get(field).hasError("required") &&
      (this.firstFormGroup.get(field).touched || this.isClickNext1)
    );
  }
  erorrNotifaction(error) {
    this.translateService.get(error).subscribe((value: string) => {
      this.showNotification("error", value);
    });
  }
  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
  successNotifaction(msg) {
    this.translateService
      .get(msg)
      .subscribe((value: string) => {
        this.showNotification("success", value);
        setTimeout(() => {
          this.dialogRef.close(true);
        }, 1000);
      });
  }
}
