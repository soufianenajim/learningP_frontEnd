import { Component, OnInit, Inject } from '@angular/core';
import { CourseService } from '../../../core/services/course/course.service';
import { ModuleService } from '../../../core/services/module/module.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Cour } from '../../../core/models/cour.model';

@Component({
  selector: 'app-save-or-update',
  templateUrl: './save-or-update.component.html',
  styleUrls: ['./save-or-update.component.css']
})
export class SaveOrUpdateComponent implements OnInit {

  courForm = new FormGroup({
    name: new FormControl(""),
    module: new FormControl(null)
  });
  listModule: any;
  idCour=null;
  isEdit=false;
  constructor(
    private courseService: CourseService,
    private moduleService: ModuleService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
   if(data!==null){
     this.isEdit=true;
     this.idCour=data.id;
     const name=data.name;
     const module= data.module;
    
    this.courForm.get("name").setValue(name);
    this.courForm.get("module").setValue(module);
   
    
   }
  }

  ngOnInit() {
    this.moduleService.findAll().subscribe(res => {
      console.log("res", res);
      this.listModule = res;
    });
  }
  save() {
    const name = this.courForm.get("name").value;
    const module = this.courForm.get("module").value;
    let cour = new Cour();
    cour.id=this.idCour;
    cour.name = name;
    cour.module = module;
    this.courseService.saveOrUpdate(cour).subscribe(resp => {
      console.log("response  ----", resp);
      this.dialogRef.close(true);
    });
  }
  cancel(){
    this.dialogRef.close(false);
  }
  compareModule(c1: any, c2: any):boolean{
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }


}
