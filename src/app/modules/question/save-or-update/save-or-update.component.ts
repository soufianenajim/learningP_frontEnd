import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, FormArray } from "@angular/forms";
import { QuestionService } from "../../../core/services/question/question.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Question } from "../../../core/models/question.model";
import { SuggestionService } from "../../../core/services/suggestion/suggestion.service";
import { ModuleService } from "../../../core/services/module/module.service";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
import { ExamService } from "../../../core/services/exam/exam.service";
import { ExercicesService } from "../../../core/services/exercices/exercices.service";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  questionForm: FormGroup;

  idQuestion = null;
  isEdit = false;
  question;
  listModule = [];
  listExam = [];
  listQuiz = [];
  listTd = [];
  isExam = false;
  isQuiz = false;
  isTd = false;
  alphabet="A"
  constructor(
    private questionService: QuestionService,
    private suggestionService: SuggestionService,
    private moduleService: ModuleService,
    private examService: ExamService,
    private exercicesService: ExercicesService,
    private tokenStorageService: TokenStorageService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.questionForm = this.fb.group({
      name: new FormControl(""),
      code: new FormControl(""),
      correctComment: new FormControl(""),
      module: new FormControl(null),
      exam: new FormControl(null),
      exercices: new FormControl(null),
      type: new FormControl(""),
      suggestions: this.fb.array([]),
    });
    if (data !== null) {
      this.isEdit = true;
      this.idQuestion = data.id;
      this.question = data;
      this.buildForm(data);
    }
  }
  buildForm(data) {
    console.log('data',data);
    this.questionForm.get("name").setValue(data.name);
    this.questionForm.get("code").setValue(data.code);
    this.questionForm.get("correctComment").setValue(data.correctComment);
    let exam=data.exam;
   // let exercices=data.exercices;
    if(exam){
      this.questionForm.get("type").setValue("exam")
      this.questionForm.get("module").setValue(exam.module);
      this.questionForm.get("exam").setValue(exam);
    }
   this.exercicesService.findByQuestion(data.id).subscribe((resp:any)=>{
     console.log('resp-----------',resp)
    const type:String=resp.type;
    this.questionForm.get("type").setValue(type.toLowerCase());
    this.questionForm.get("module").setValue(resp.cour.module);
    this.questionForm.get("exercices").setValue(resp);
    this.onSelectType();
   })
     
   
    
   
    let suggestions = data.suggestions;
    if (suggestions) {
      for (let d of data.suggestions) {
        const index=d.name.substring(0,3);
        this.suggestions.push(
          this.fb.group({
            id: new FormControl(d.id),
            name: new FormControl(d.name.substring(3,d.name.lenght)),
            correct: new FormControl(d.correct),
          })
        );
      }
    }
    this.onSelectType();
  }
  ngOnInit() {
    console.log('s.charCodeAt(0) - 97',String.fromCharCode(97 + 0))
    const user = this.tokenStorageService.getUser();
    this.moduleService.findByProfessor(user.id).subscribe((resp: any) => {
      this.listModule = resp;
    });
  }
  save() {
    console.log("fomr", this.questionForm.value);
    const name = this.questionForm.get("name").value;
    const code = this.questionForm.get("code").value;
    const correctComment = this.questionForm.get("correctComment").value;
    const exam = this.questionForm.get("exam").value;
    const exercices = this.questionForm.get("exercices").value;
    const suggestions :any[] = this.questionForm.get("suggestions").value;
    for (let index = 0; index < suggestions.length; index++) {
      suggestions[index].name =this.getAlphabet(index).concat(suggestions[index].name);
    }
    let question = new Question();
    question.id = this.idQuestion;
    question.name = name;
    question.code = code;
    question.correctComment = correctComment;
    question.suggestions = suggestions;
    question.exercices = exercices;
    question.exam =exam;
    this.questionService.saveOrUpdate(question).subscribe((resp) => {
      console.log("response  ----", resp);
      this.dialogRef.close(true);
    });
  }
  cancel() {
    this.dialogRef.close(false);
  }
  compareQuestion(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  public get suggestions(): FormArray {
    return this.questionForm.get("suggestions") as FormArray;
  }

  newSuggestion(): FormGroup {
    return this.fb.group({
      id: new FormControl(null),
      name: new FormControl(),
      correct: new FormControl(false),
    });
  }

  addSuggestions() {
    this.suggestions.push(this.newSuggestion());
  }
getAlphabet(i){
 return String.fromCharCode(97 + i).toUpperCase().concat(' - ');
}  

  removeSuggestion(i: number) {

    if (this.isEdit) {
      const id = this.suggestions.at(i).value.id;
      if (id != null) {
        this.suggestionService.delete(id).subscribe((resp) => {
          this.suggestions.removeAt(i);
        });
      } else {
        this.suggestions.removeAt(i);
      }
    } else {
      this.suggestions.removeAt(i);
    }
  }

  onSubmit() {
    console.log(this.questionForm.value);
  }
  compareModule(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  onSelectType() {
    const type = this.questionForm.get("type").value;
    const module = this.questionForm.get("module").value;
    console.log('module',module);
    console.log('type',type);
    if (module) {
      if (type === "exam") {
        this.examService.findByModule(module.id).subscribe((resp:any)=>{
          this.isExam = true;
          this.isQuiz = false;
          this.isTd = false;
          this.listExam=resp;
        })
      
      } else if (type === "quiz") {
        this.exercicesService.findByModuleAndType(module.id,"QUIZ").subscribe((resp:any)=>{
          this.isExam = false;
          this.isQuiz = true;
          this.isTd = false;
          this.listQuiz=resp;
        })
        
      } else if (type === "td") {
        this.exercicesService.findByModuleAndType(module.id,"TD").subscribe((resp:any)=>{
          console.log('resp td',resp);
          this.isExam = false;
          this.isQuiz = false;
          this.isTd = true;
          this.listTd=resp;
        })
      }
    }
  }
}
