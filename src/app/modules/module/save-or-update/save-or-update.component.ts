import { Component, OnInit, Inject } from '@angular/core';
import { Module } from '../../../core/models/module.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ModuleService } from '../../../core/services/module/module.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-save-or-update',
  templateUrl: './save-or-update.component.html',
  styleUrls: ['./save-or-update.component.css']
})
export class SaveOrUpdateComponent implements OnInit {

 moduleForm = new FormGroup({
  name: new FormControl(""),
});

idModule=null;
isEdit=false;
constructor(
  private moduleService: ModuleService,
  public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any
) {
 if(data!==null){
   this.isEdit=true;
   this.idModule=data.id;
   const name=data.name;
  
  this.moduleForm.get("name").setValue(name);
 
  
 }
}

ngOnInit() {
  
}
save() {
  const name = this.moduleForm.get("name").value;
  let module = new Module();
  module.id=this.idModule;
  module.name = name;
  this.moduleService.saveOrUpdate(module).subscribe(resp => {
    console.log("response  ----", resp);
    this.dialogRef.close(true);
  });
}
cancel(){
  this.dialogRef.close(false);
}


}



