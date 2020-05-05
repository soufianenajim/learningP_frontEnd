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

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  moduleForm = new FormGroup({
    name: new FormControl("",[Validators.required,this.noWhitespaceValidator]),
    prof: new FormControl(null,Validators.required),
    group: new FormControl(null,Validators.required),
  });
  listLevel = [];

  listGroup = [];
  listProfessor = [];

  idModule = null;
  isEdit = false;
  isClickSave = false;
  private readonly notifier: NotifierService;
  constructor(
    private moduleService: ModuleService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    private groupService: GroupService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private translateService:TranslateService,
     notifierService: NotifierService
  ) {
    this.notifier=notifierService;
    if (data !== null) {
      this.isEdit = true;
      this.idModule = data.id;
      const name = data.name;
      const group = data.group;
      const prof = data.professor;
      console.log("data", data);
      this.moduleForm.get("name").setValue(name);
      this.moduleForm.get("group").setValue(group);
      this.moduleForm.get("prof").setValue(prof);
      console.log('form',this.moduleForm.value)

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
              });
          });
     
  }
  save() {
    this.isClickSave = true;
    const name = this.moduleForm.get("name").value;
    const group = this.moduleForm.get("group").value;
    const professor = this.moduleForm.get("prof").value;
    let module = new Module();
    module.id = this.idModule;
    module.name = name;
    module.group = group;
    module.professor = professor;
    console.log("module", module);
    if(this.moduleForm.valid){
      this.moduleService.saveOrUpdate(module).subscribe( 
        (resp) => {
          this.successNotifaction();
        },
        (error) => {
          this.erorrNotifaction();
        }   
    );
    
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
  erorrNotifaction() {
    this.translateService.get("MODULE.EXIST").subscribe((value: string) => {
      this.showNotification("error", value);
    });
  }
}
