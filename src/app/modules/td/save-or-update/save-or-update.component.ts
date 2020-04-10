import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CourseService } from "../../../core/services/course/course.service";
import { Td } from "../../../core/models/td.model";
import { TdService } from "../../../core/services/td/td.service";
import { ActivatedRoute, Params } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { QuestionService } from "../../../core/services/question/question.service";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"]
})
export class SaveOrUpdateComponent implements OnInit {
  listQuestion = [];
  tdForm = new FormGroup({
    name: new FormControl(""),
    cour: new FormControl(null)
  });
  listCour: any;
  idTd=null;
  isEdit=false;
  parentQuestions;
  constructor(
    private courseService: CourseService,
    private tdService: TdService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    private questionService:QuestionService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
   if(data!==null){
    this.questionService.findByTd(data.id).subscribe(resp=>{
    this.parentQuestions=resp;
     this.isEdit=true;
     this.idTd=data.id;
     const name=data.name;
     const cour= data.cour;
    
    this.tdForm.get("name").setValue(name);
    this.tdForm.get("cour").setValue(cour);
   
    }) 
   }
  }

  ngOnInit() {
    this.courseService.findAll().subscribe(res => {
      console.log("res", res);
      this.listCour = res;
    });
  }
  save() {
    
    const name = this.tdForm.get("name").value;
    const cour = this.tdForm.get("cour").value;
    let td = new Td();
    td.id=this.idTd;
    td.name = name;
    td.cour = cour;
    td.questions=this.listQuestion;
    this.tdService.saveOrUpdate(td).subscribe(resp => {
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
  getQuestionsOutPut(event) {
    console.log('event from child',event);
    this.listQuestion = event;
  }
}
