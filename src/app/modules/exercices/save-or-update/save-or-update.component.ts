import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ModuleService } from "../../../core/services/module/module.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Exercices } from "../../../core/models/exercices.model";
import { ExercicesService } from "../../../core/services/exercices/exercices.service";
import { QuestionService } from "../../../core/services/question/question.service";
import { CourseService } from "../../../core/services/course/course.service";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  exercicesForm = new FormGroup({
    name: new FormControl(""),
    type: new FormControl(""),
    module: new FormControl(null),
    cour: new FormControl(null),
  });
  listModule: any;
  idExercices = null;
  isEdit = false;
  listCour = [];
  constructor(
    private moduleService: ModuleService,
    private exercicesService: ExercicesService,
    private questionSerivce: QuestionService,
    private tokenStorageService:TokenStorageService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private courService: CourseService
  ) {
    if (data !== null) {
      this.questionSerivce.findByExercices(data.id).subscribe((resp) => {
       
        this.isEdit = true;
        this.idExercices = data.id;
       this.buildForm(data);
       
      });
    }
  }
buildForm(data){
  const name = data.name;
  const module = data.cour.module;
  const type=data.type;
 const cour=data.cour;
  this.exercicesForm.get("name").setValue(name);
  this.exercicesForm.get("module").setValue(module);
  this.exercicesForm.get("cour").setValue(cour);
  this.exercicesForm.get("type").setValue(type);
  this.onSelectModule();
}
  ngOnInit() {
     const user = this.tokenStorageService.getUser();
    this.moduleService.findByProfessor(user.id).subscribe((resp: any) => {
      this.listModule = resp;
    });
  }
  save() {
    const name = this.exercicesForm.get("name").value;
    const cour = this.exercicesForm.get("cour").value;
    const type=this.exercicesForm.get("type").value;
    let exercices = new Exercices();
    exercices.id = this.idExercices;
    exercices.name = name;
    exercices.cour=cour;
    exercices.type=type;
    console.log('exercices',exercices);
    this.exercicesService.saveOrUpdate(exercices).subscribe((resp) => {
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
  onSelectModule() {
    const module = this.exercicesForm.get("module").value;
    this.courService.findByModule(module.id).subscribe((resp:any) => {
      this.listCour=resp;
    });
  }
}
