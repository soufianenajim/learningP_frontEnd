
import { Component, OnInit, Inject } from '@angular/core';
import { Level } from '../../../core/models/level.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrganizationService } from '../../../core/services/organization/organization.service';
import { LevelService } from '../../../core/services/level/level.service';
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
  levelForm = new FormGroup({
    name: new FormControl("",[Validators.required,this.noWhitespaceValidator]),
  });
  listOrganization: any;
  idLevel=null;
  isEdit=false;
  organization;
  isClickSave=false;
  private readonly notifier: NotifierService;
  constructor(
    private levelService: LevelService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private tokenStorageService:TokenStorageService,
    private translateService:TranslateService,
    notifierService: NotifierService
  ) {
    this.notifier=notifierService;
   if(data!==null){
     this.isEdit=true;
     this.idLevel=data.id;
     const name=data.name;
    
    this.levelForm.get("name").setValue(name);
   
    
   }
  }

  ngOnInit() {
    const user = this.tokenStorageService.getUser();
    this.organization=user.organization;
  }
  save() {
    this.isClickSave=true;
    const name = this.levelForm.get("name").value;
    let level = new Level();
    level.id=this.idLevel;
    level.name = name;
    level.organization = this.organization;
    if(this.levelForm.valid){
    this.levelService.saveOrUpdate(level).subscribe( (resp) => {
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
  errorerrormptyField(field: string) {
    return (
      this.levelForm.get(field).hasError("required") &&
      (this.levelForm.get(field).touched || this.isClickSave)
    );
  }
  invalidData(field: string) {
    return (
      this.levelForm.get(field).hasError("whitespace") &&
      !this.levelForm.get(field).hasError("required") &&
      (this.levelForm.get(field).touched || this.isClickSave)
    );
  }
  successNotifaction() {
    this.translateService
      .get("LEVEL.SAVE_SUCCESS")
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
    this.translateService.get("LEVEL.EXIST").subscribe((value: string) => {
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

}
