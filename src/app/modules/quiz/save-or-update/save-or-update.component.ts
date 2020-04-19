import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ModuleService } from "../../../core/services/module/module.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Quiz } from "../../../core/models/quiz.model";
import { QuizService } from "../../../core/services/quiz/quiz.service";
import { QuestionService } from "../../../core/services/question/question.service";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  listQuestion = [];
  quizForm = new FormGroup({
    name: new FormControl(""),
    module: new FormControl(null),
  });
  listModule: any;
  idQuiz = null;
  isEdit = false;
  parentQuestions;
  constructor(
    private moduleseService: ModuleService,
    private quizService: QuizService,
    private questionSerivce:QuestionService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data !== null) {
      this.questionSerivce.findByQuiz(data.id).subscribe(resp=>{
        console.log('questions',resp);
        this.parentQuestions=resp;
        this.isEdit = true;
        this.idQuiz = data.id;
        
        const name = data.name;
        const module = data.module;
  
        this.quizForm.get("name").setValue(name);
        this.quizForm.get("module").setValue(module);
      })
     
    }
  }

  ngOnInit() {
    this.moduleseService.findAll().subscribe((res) => {
      console.log('resp',res)
      this.listModule = res;
    });
  }
  save() {
    const name = this.quizForm.get("name").value;
    const module = this.quizForm.get("module").value;
    let quiz = new Quiz();
    quiz.id = this.idQuiz;
    quiz.name = name;
    quiz.module = module;
    quiz.questions=this.listQuestion;
    this.quizService.saveOrUpdate(quiz).subscribe((resp) => {
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
