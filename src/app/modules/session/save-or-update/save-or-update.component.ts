
import { Component, OnInit, Inject } from '@angular/core';
import { Session } from '../../../core/models/session.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionService } from '../../../core/services/session/session.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TokenStorageService } from '../../../core/services/token_storage/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-save-or-update',
  templateUrl: './save-or-update.component.html',
  styleUrls: ['./save-or-update.component.css']
})
export class SaveOrUpdateComponent implements OnInit {
  sessionForm = new FormGroup({
    name: new FormControl("",[Validators.required,this.noWhitespaceValidator]),
    startDate:new FormControl("",Validators.required),
    endDate:new FormControl("",Validators.required),
    startDateExam:new FormControl("",Validators.required),
    endDateExam:new FormControl("",Validators.required),
    startDateCatchUp:new FormControl("",Validators.required),
    endDateCatchUp:new FormControl("",Validators.required),
    
    
  });
  listOrganization: any;
  idSession=null;
  isEdit=false;
 organization;
 isClickSave=false;
 private readonly notifier: NotifierService;
  constructor(
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private tokenStorageService:TokenStorageService,
    private translateService:TranslateService,
    notifierService: NotifierService
  ) {
    this.notifier=notifierService;
   if(data!==null){
     this.isEdit=true;
     this.idSession=data.id;
     this.buildForm(data);
   
   
    
   }
  }
buildForm(data){
  const name=data.name;
  const startDate=data.startDate;
  const endDate=data.endDate;
  const startDateExam=data.startDateExam;
  const endDateExam=data.endDateExam;
  const startDateCatchUp=data.startDateCatchUp;
  const endDateCatchUp=data.endDateCatchUp;
  this.sessionForm.get("name").setValue(name);
  this.sessionForm.get("startDate").setValue(startDate);
  this.sessionForm.get("endDate").setValue(endDate);
  this.sessionForm.get("startDateExam").setValue(startDateExam);
  this.sessionForm.get("endDateExam").setValue(endDateExam);
  this.sessionForm.get("startDateCatchUp").setValue(startDateCatchUp);
  this.sessionForm.get("endDateCatchUp").setValue(endDateCatchUp);
}
  ngOnInit() {
    const user = this.tokenStorageService.getUser();
    this.organization=user.organization;
  }
  save() {
    this.isClickSave=true;
    const name = this.sessionForm.get("name").value;
    const startDate = this.sessionForm.get("startDate").value;
    const endtDate = this.sessionForm.get("endDate").value;
    const startDateExam = this.sessionForm.get("startDateExam").value;
    const endDateExam = this.sessionForm.get("endDateExam").value;
    const startDateCatchUp = this.sessionForm.get("startDateCatchUp").value;
    const endDateCatchUp = this.sessionForm.get("endDateCatchUp").value;

    let session = new Session();
    session.id=this.idSession;
    session.name = name;
    session.organization = this.organization;
    session.startDate=startDate;
    session.endDate=endtDate;
    session.startDateExam=startDateExam;
    session.endDateExam=endDateExam;
    session.startDateCatchUp=startDateCatchUp;
    session.endDateCatchUp=endDateCatchUp;
    if(this.sessionForm.valid){
    this.sessionService.saveOrUpdate(session).subscribe( (resp) => {
      this.successNotifaction();
    },
    (error) => {
      this.erorrNotifaction();
    } );
  }
  }
  cancel(){
    this.dialogRef.close(false);
  }
  compareOrganization(c1: any, c2: any):boolean{
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  errormptyField(field: string) {
    return (
      this.sessionForm.get(field).hasError("required") &&
      (this.sessionForm.get(field).touched || this.isClickSave)
    );
  }
  invalidData(field: string) {
    return (
      this.sessionForm.get(field).hasError("whitespace") &&
      !this.sessionForm.get(field).hasError("required") &&
      (this.sessionForm.get(field).touched || this.isClickSave)
    );
  }
  successNotifaction() {
    this.translateService
      .get("SESSION.SAVE_SUCCESS")
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
  erorrNotifaction() {
    this.translateService.get("BRANCH.EXIST").subscribe((value: string) => {
      this.showNotification("error", value);
    });
  }
  public noWhitespaceValidator(control: FormControl) {
    if (control.value === "") {
      return null;
    }
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  } 
  isFieldValid(field: string) {
    return !this.sessionForm.get(field).valid && this.sessionForm.get(field).touched;
  }



}
