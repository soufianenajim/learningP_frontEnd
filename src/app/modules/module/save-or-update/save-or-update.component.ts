import { Component, OnInit, Inject } from "@angular/core";
import { Module } from "../../../core/models/module.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModuleService } from "../../../core/services/module/module.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GroupService } from "../../../core/services/group/group.service";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
import { UserService } from "../../../core/services/user/user.service";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { min } from "d3";
import { ModuleNameService } from "../../../core/services/module_name/module-name.service";
import { SessionService } from "../../../core/services/session/session.service";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  moduleForm = new FormGroup({
    name: new FormControl("", [
      Validators.required,
      this.noWhitespaceValidator,
    ]),
    coefficient: new FormControl("", [Validators.required]),
    prof: new FormControl(null, Validators.required),
    group: new FormControl(null, Validators.required),
    module: new FormControl(null, Validators.required),
    session: new FormControl(null, Validators.required),
    percentageAbsence: new FormControl("", [
      Validators.required,
      Validators.min(0),
    ]),
    percentageCour: new FormControl("", [
      Validators.required,
      Validators.min(0),
    ]),
    percentageQuiz: new FormControl("", [
      Validators.required,
      Validators.min(5),
    ]),
    percentageExam: new FormControl("", [
      Validators.required,
      Validators.min(20),
    ]),
    scale: new FormControl("", [Validators.required, Validators.min(5)]),
  });
  totalPercentage = 0;
  listLevel = [];

  listGroup = [];
  listProfessor = [];
  listModuleName = [];
  listSession = [];

  idModule = null;
  isEdit = false;
  isClickSave = false;
  isTeacher = false;
  private readonly notifier: NotifierService;
  constructor(
    private moduleService: ModuleService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    private groupService: GroupService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private translateService: TranslateService,
    notifierService: NotifierService,
    private moduleNameService: ModuleNameService,
    private sessionService: SessionService
  ) {
    this.notifier = notifierService;
    if (data !== null) {
      this.isTeacher = data.isTeacher;
      this.isEdit = true;
      this.idModule = data.id;
      this.buildForm(data);
    }
  }
  buildForm(data) {
    const name = data.name;
    const group = data.group;
    const prof = data.professor;
    const coefficient = data.coefficient;
    const percentageAbsence = data.percentageAbsence;
    const percentageCour = data.percentageCour;
    const percentageExam = data.percentageExam;
    const percentageQuiz = data.percentageQuiz;
    const scale = data.scale;
    const module = data.module;
    const session=data.session;
    this.moduleForm.get("name").setValue(name);
    this.moduleForm.get("group").setValue(group);
    this.moduleForm.get("prof").setValue(prof);
    this.moduleForm.get("coefficient").setValue(coefficient);
    this.moduleForm.get("percentageAbsence").setValue(percentageAbsence);
    this.moduleForm.get("percentageCour").setValue(percentageCour);
    this.moduleForm.get("percentageExam").setValue(percentageExam);
    this.moduleForm.get("percentageQuiz").setValue(percentageQuiz);
    this.moduleForm.get("scale").setValue(scale);
    this.moduleForm.get("module").setValue(module);
    this.moduleForm.get("session").setValue(session);

    if (this.isTeacher) {
      this.moduleForm.get("name").disable();
      this.moduleForm.get("group").disable();
      this.moduleForm.get("prof").disable();
      this.moduleForm.get("coefficient").disable();
    } else {
      this.moduleForm.get("percentageAbsence").disable();
      this.moduleForm.get("percentageCour").disable();
      this.moduleForm.get("percentageExam").disable();
      this.moduleForm.get("percentageQuiz").disable();
      this.moduleForm.get("scale").disable();
    }
  }
  ngOnInit() {
    const user = this.tokenStorageService.getUser();

    this.groupService
      .findByOrganization(user.organization.id)
      .subscribe((response: any) => {
        this.listGroup = response;
        this.userService
          .findAllProfessorByOrga(user.organization.id)
          .subscribe((resp: any) => {
            this.listProfessor = resp;
            this.moduleNameService
              .findByOrganisation(user.organization.id)
              .subscribe((resp: any) => {
                this.listModuleName = resp;
                this.sessionService
                  .findByOrganisation(user.organization.id)
                  .subscribe((resp: any) => {
                    this.listSession = resp;
                  });
              });
          });
      });
  }
  save() {
    this.onReCalculateTotal();
    this.isClickSave = true;
    const name = this.moduleForm.get("name").value;
    const group = this.moduleForm.get("group").value;
    const professor = this.moduleForm.get("prof").value;
    const coefficient = this.moduleForm.get("coefficient").value;
    const percentageAbsence = this.moduleForm.get("percentageAbsence").value;
    const percentageCour = this.moduleForm.get("percentageCour").value;
    const percentageExam = this.moduleForm.get("percentageExam").value;
    const percentageQuiz = this.moduleForm.get("percentageQuiz").value;
    const scale = this.moduleForm.get("scale").value;
    const moduleN = this.moduleForm.get("module").value;
    const session=this.moduleForm.get("session").value;
    let module = new Module();
    module.id = this.idModule;
    module.name = name;
    module.group = group;
    module.professor = professor;
    module.coefficient = coefficient;
    module.percentageAbsence = percentageAbsence;
    module.percentageCour = percentageCour;
    module.percentageExam = percentageExam;
    module.percentageQuiz = percentageQuiz;
    module.scale = scale;
    module.module = moduleN;
    module.session=session;

    if (this.moduleForm.valid) {
      if (this.totalPercentage == 100) {
        this.moduleService.saveOrUpdate(module).subscribe(
          (resp) => {
            this.successNotifaction();
          },
          (error) => {
            this.erorrNotifaction("MODULE.EXIST");
          }
        );
      } else {
        this.erorrNotifaction("MODULE.TOTAL_PERCENTAGE");
      }
    }
  }
  cancel() {
    this.dialogRef.close(false);
  }

  compareGroup(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  compareLevel(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  compareOrg(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  public noWhitespaceValidator(control: FormControl) {
    if (control.value === "") {
      return null;
    }
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
  errormptyField(field: string) {
    return (
      this.moduleForm.get(field).hasError("required") &&
      (this.moduleForm.get(field).touched || this.isClickSave)
    );
  }
  invalidData(field: string) {
    return (
      this.moduleForm.get(field).hasError("whitespace") &&
      !this.moduleForm.get(field).hasError("required") &&
      (this.moduleForm.get(field).touched || this.isClickSave)
    );
  }
  successNotifaction() {
    this.translateService
      .get("MODULE.SAVE_SUCCESS")
      .subscribe((value: string) => {
        this.showNotification("success", value);
        setTimeout(() => {
          this.dialogRef.close(true);
        }, 1000);
      });
  }
  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
  erorrNotifaction(msg) {
    this.translateService.get(msg).subscribe((value: string) => {
      this.showNotification("error", value);
    });
  }
  onReCalculateTotal() {
    const percentageAbsence = this.moduleForm.get("percentageAbsence").value;
    const percentageCour = this.moduleForm.get("percentageCour").value;
    const percentageExam = this.moduleForm.get("percentageExam").value;
    const percentageQuiz = this.moduleForm.get("percentageQuiz").value;
    this.totalPercentage =
      percentageAbsence + percentageCour + percentageExam + percentageQuiz;
  }
}
