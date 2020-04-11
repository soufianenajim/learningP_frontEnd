
import { Component, OnInit, Inject } from '@angular/core';
import { Level } from '../../../core/models/level.model';
import { FormGroup, FormControl } from '@angular/forms';
import { OrganizationService } from '../../../core/services/organization/organization.service';
import { LevelService } from '../../../core/services/level/level.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-save-or-update',
  templateUrl: './save-or-update.component.html',
  styleUrls: ['./save-or-update.component.css']
})
export class SaveOrUpdateComponent implements OnInit {
  levelForm = new FormGroup({
    name: new FormControl(""),
    organization: new FormControl(null)
  });
  listOrganization: any;
  idLevel=null;
  isEdit=false;
  constructor(
    private organizationService: OrganizationService,
    private levelService: LevelService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
   if(data!==null){
     this.isEdit=true;
     this.idLevel=data.id;
     const name=data.name;
     const organization= data.organization;
    
    this.levelForm.get("name").setValue(name);
    this.levelForm.get("organization").setValue(organization);
   
    
   }
  }

  ngOnInit() {
    this.organizationService.findAll().subscribe(res => {
      console.log("res", res);
      this.listOrganization = res;
    });
  }
  save() {
    const name = this.levelForm.get("name").value;
    const organization = this.levelForm.get("organization").value;
    let level = new Level();
    level.id=this.idLevel;
    level.name = name;
    level.organization = organization;
    this.levelService.saveOrUpdate(level).subscribe(resp => {
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
