import { Component, OnInit, Inject } from '@angular/core';
import { Organization } from '../../../core/models/organization.model';
import { FormGroup, FormControl } from '@angular/forms';
import { OrganizationService } from '../../../core/services/organization/organization.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-save-or-update',
  templateUrl: './save-or-update.component.html',
  styleUrls: ['./save-or-update.component.css']
})
export class SaveOrUpdateComponent implements OnInit {

 organizationForm = new FormGroup({
  name: new FormControl(""),
});

idOrganization=null;
isEdit=false;
constructor(
  private organizationService: OrganizationService,
  public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any
) {
 if(data!==null){
   this.isEdit=true;
   this.idOrganization=data.id;
   const name=data.name;
  
  this.organizationForm.get("name").setValue(name);
 
  
 }
}

ngOnInit() {
  
}
save() {
  const name = this.organizationForm.get("name").value;
  let organization = new Organization();
  organization.id=this.idOrganization;
  organization.name = name;
  this.organizationService.saveOrUpdate(organization).subscribe(resp => {
    console.log("response  ----", resp);
    this.dialogRef.close(true);
  });
}
cancel(){
  this.dialogRef.close(false);
}


}



