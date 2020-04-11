
import { Component, OnInit, Inject } from '@angular/core';
import { Branch } from '../../../core/models/branch.model';
import { FormGroup, FormControl } from '@angular/forms';
import { OrganizationService } from '../../../core/services/organization/organization.service';
import { BranchService } from '../../../core/services/branch/branch.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-save-or-update',
  templateUrl: './save-or-update.component.html',
  styleUrls: ['./save-or-update.component.css']
})
export class SaveOrUpdateComponent implements OnInit {
  branchForm = new FormGroup({
    name: new FormControl(""),
    organization: new FormControl(null)
  });
  listOrganization: any;
  idBranch=null;
  isEdit=false;
  constructor(
    private organizationService: OrganizationService,
    private branchService: BranchService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
   if(data!==null){
     this.isEdit=true;
     this.idBranch=data.id;
     const name=data.name;
     const organization= data.organization;
    
    this.branchForm.get("name").setValue(name);
    this.branchForm.get("organization").setValue(organization);
   
    
   }
  }

  ngOnInit() {
    this.organizationService.findAll().subscribe(res => {
      console.log("res", res);
      this.listOrganization = res;
    });
  }
  save() {
    const name = this.branchForm.get("name").value;
    const organization = this.branchForm.get("organization").value;
    let branch = new Branch();
    branch.id=this.idBranch;
    branch.name = name;
    branch.organization = organization;
    this.branchService.saveOrUpdate(branch).subscribe(resp => {
      console.log("response  ----", resp);
      this.dialogRef.close(true);
    });
  }
  cancel(){
    this.dialogRef.close(false);
  }
  compareOrganization(c1: any, c2: any):boolean{
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
