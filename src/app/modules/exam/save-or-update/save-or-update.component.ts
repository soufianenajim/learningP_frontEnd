import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Exam } from "../../../core/models/exam.model";
import { ModuleService } from "../../../core/services/module/module.service";
import { ExamService } from "../../../core/services/exam/exam.service";
import { QuestionService } from "../../../core/services/question/question.service";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  examForm = new FormGroup({
    name: new FormControl(""),
    module: new FormControl(null),
    startTime: new FormControl(""),
    endTime: new FormControl(""),
  });
  listModule: any;
  idExam = null;
  isEdit = false;
  parentQuestions;
  exam=null;
  constructor(
    private moduleseService: ModuleService,
    private examService: ExamService,
    private questionService: QuestionService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data !== null) {
    this.exam=data;
    console.log('this.exam',this.exam);
    }
  }
 
  ngOnInit() {
   
  }
 
 

  
}
