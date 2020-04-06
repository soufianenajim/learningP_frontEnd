import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CourseService } from "../../../core/services/course/course.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Quiz } from "../../../core/models/quiz.model";
import { QuizService } from "../../../core/services/quiz/quiz.service";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  listQuestion = [];
  quizForm = new FormGroup({
    name: new FormControl(""),
    cour: new FormControl(null),
  });
  listCour: any;
  idQuiz = null;
  isEdit = false;
  constructor(
    private courseService: CourseService,
    private quizService: QuizService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data !== null) {
      this.isEdit = true;
      this.idQuiz = data.id;
      const name = data.name;
      const cour = data.cour;

      this.quizForm.get("name").setValue(name);
      this.quizForm.get("cour").setValue(cour);
    }
  }

  ngOnInit() {
    this.courseService.findAll().subscribe((res) => {
      console.log("res", res);
      this.listCour = res;
    });
  }
  save() {
    const name = this.quizForm.get("name").value;
    const cour = this.quizForm.get("cour").value;
    let quiz = new Quiz();
    quiz.id = this.idQuiz;
    quiz.name = name;
    quiz.cour = cour;
    quiz.questions=this.listQuestion;
    this.quizService.saveOrUpdate(quiz).subscribe((resp) => {
      console.log("response  ----", resp);
      this.dialogRef.close(true);
    });
  }
  cancel() {
    this.dialogRef.close(false);
  }
  compareCour(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  getQuestionsOutPut(event) {
    console.log('event from child',event);
    this.listQuestion = event;
  }
}
