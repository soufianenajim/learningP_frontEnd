import { Component, OnInit, Inject } from '@angular/core';
import { Chapitre } from '../../../core/models/chapitre.model';
import { FormGroup, FormControl } from '@angular/forms';
import { CourseService } from '../../../core/services/course/course.service';
import { ChapterService } from '../../../core/services/chapter/chapter.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-save-or-update',
  templateUrl: './save-or-update.component.html',
  styleUrls: ['./save-or-update.component.css']
})
export class SaveOrUpdateComponent implements OnInit {
  chapitreForm = new FormGroup({
    name: new FormControl(""),
    cour: new FormControl(null)
  });
  listCour: any;
  idChapitre=null;
  isEdit=false;
  constructor(
    private courseService: CourseService,
    private chapitreService: ChapterService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
   if(data!==null){
     this.isEdit=true;
     this.idChapitre=data.id;
     const name=data.name;
     const cour= data.cour;
    
    this.chapitreForm.get("name").setValue(name);
    this.chapitreForm.get("cour").setValue(cour);
   
    
   }
  }

  ngOnInit() {
    this.courseService.findAll().subscribe(res => {
      console.log("res", res);
      this.listCour = res;
    });
  }
  save() {
    const name = this.chapitreForm.get("name").value;
    const cour = this.chapitreForm.get("cour").value;
    let chapitre = new Chapitre();
    chapitre.id=this.idChapitre;
    chapitre.name = name;
    chapitre.cour = cour;
    this.chapitreService.saveOrUpdate(chapitre).subscribe(resp => {
      console.log("response  ----", resp);
      this.dialogRef.close(true);
    });
  }
  cancel(){
    this.dialogRef.close(false);
  }
  compareCour(c1: any, c2: any):boolean{
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
