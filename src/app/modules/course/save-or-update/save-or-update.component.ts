import { Component, OnInit, Inject } from "@angular/core";
import { CourseService } from "../../../core/services/course/course.service";
import { ModuleService } from "../../../core/services/module/module.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl } from "@angular/forms";
import { Cour } from "../../../core/models/cour.model";
import { QuizService } from "../../../core/services/quiz/quiz.service";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  courForm = new FormGroup({
    name: new FormControl(""),
    module: new FormControl(null),
    quiz: new FormControl(null),
    content: new FormControl(""),
  });
  listModule: any;
  listQuiz: any;
  idCour = null;
  isEdit = false;
  constructor(
    private courseService: CourseService,
    private moduleService: ModuleService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    private quizService: QuizService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data !== null) {
      this.isEdit = true;
      this.idCour = data.id;
      const name = data.name;
      const module = data.module;
      const content = data.content;
      const quiz = data.quiz;
console.log('quiz',quiz)
      this.courForm.get("name").setValue(name);
      this.courForm.get("module").setValue(module);
      this.courForm.get("quiz").setValue(quiz);
      this.courForm.get("content").setValue(content);
      console.log('quiz form',this.courForm.get('quiz').value);
      this.onSelectModule();
    }
  }

  ngOnInit() {
    this.moduleService.findAll().subscribe((res) => {
      console.log("res", res);
      this.listModule = res;
    });
  }
  save() {
    const name = this.courForm.get("name").value;
    const module = this.courForm.get("module").value;
    const quiz = this.courForm.get("quiz").value;
    const content = this.courForm.get("content").value;

    let cour = new Cour();
    cour.id = this.idCour;
    cour.name = name;
    cour.module = module;
    cour.quiz = quiz;
    cour.content = content;
    console.log("cour", cour);
    this.courseService.saveOrUpdate(cour).subscribe((resp) => {
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
  compareQuiz(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  onSelectModule() {
    const module = this.courForm.get("module").value;
    this.quizService.findByModule(module.id).subscribe((resp) => {
      console.log('quizq',resp);
      this.listQuiz = resp;
    });
  }
}
