import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { QuestionService } from "../../../core/services/question/question.service";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit {
  exam;
  isShow=false;
    constructor(public dialogRef: MatDialogRef<DetailComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,) { }
  
    ngOnInit() {
      console.log('this.data',this.data.questions);
      if(this.data!=null){
        this.exam=this.data;
      }
    }
   
    cancel(){
      this.dialogRef.close();
    }
}
