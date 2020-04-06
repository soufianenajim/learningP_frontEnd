import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Exam } from "../../../core/models/exam.model";
import { ModuleService } from "../../../core/services/module/module.service";
import { ExamService } from "../../../core/services/exam/exam.service";
import { QuestionService } from "../../../core/services/question/question.service";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  listQuestion = [];
  examForm = new FormGroup({
    name: new FormControl(""),
    module: new FormControl(null),
  });
  listModule: any;
  idExam = null;
  isEdit = false;
  parentQuestions;
  constructor(
    private moduleseService: ModuleService,
    private examService: ExamService,
    private questionService:QuestionService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data !== null) {
      this.questionService.findByExam(data.id).subscribe(resp=>{
        console.log('questions',resp);
        this.parentQuestions=resp;
        this.isEdit = true;
        this.idExam = data.id;
        
        const name = data.name;
        const module = data.module;
  
        this.examForm.get("name").setValue(name);
        this.examForm.get("module").setValue(module);
      })
    }
  }

  ngOnInit() {
    this.moduleseService.findAll().subscribe((res) => {
      console.log("res", res);
      this.listModule = res;
    });
  }
  save() {
    const name = this.examForm.get("name").value;
    const module = this.examForm.get("module").value;
    let exam = new Exam();
    exam.id = this.idExam;
    exam.name = name;
    exam.module = module;
    exam.questions=this.listQuestion;
    this.examService.saveOrUpdate(exam).subscribe((resp) => {
      console.log("response  ----", resp);
      this.dialogRef.close(true);
    });
  }
  cancel() {
    this.dialogRef.close(false);
  }
  compareModule(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  getQuestionsOutPut(event) {
    console.log('event from child',event);
    this.listQuestion = event;
  }
}
