
import { Component, OnInit, Inject } from '@angular/core';
import { Branch } from '../../../core/models/branch.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BranchService } from '../../../core/services/branch/branch.service';
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
  branchForm = new FormGroup({
    name: new FormControl("",[Validators.required,this.noWhitespaceValidator]),
    
  });
  listOrganization: any;
  idBranch=null;
  isEdit=false;
 organization;
 isClickSave=false;
 private readonly notifier: NotifierService;
  constructor(
    private branchService: BranchService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private tokenStorageService:TokenStorageService,
    private translateService:TranslateService,
    notifierService: NotifierService
  ) {
    this.notifier=notifierService;
   if(data!==null){
     this.isEdit=true;
     this.idBranch=data.id;
     const name=data.name;
    
    this.branchForm.get("name").setValue(name);
   
    
   }
  }

  ngOnInit() {
    const user = this.tokenStorageService.getUser();
    this.organization=user.organization;
  }
  save() {
    this.isClickSave=true;
    const name = this.branchForm.get("name").value;
    let branch = new Branch();
    branch.id=this.idBranch;
    branch.name = name;
    branch.organization = this.organization;
    if(this.branchForm.valid){
    this.branchService.saveOrUpdate(branch).subscribe( (resp) => {
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
      this.branchForm.get(field).hasError("required") &&
      (this.branchForm.get(field).touched || this.isClickSave)
    );
  }
  invalidData(field: string) {
    return (
      this.branchForm.get(field).hasError("whitespace") &&
      !this.branchForm.get(field).hasError("required") &&
      (this.branchForm.get(field).touched || this.isClickSave)
    );
  }
  successNotifaction() {
    this.translateService
      .get("BRANCH.SAVE_SUCCESS")
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


}
