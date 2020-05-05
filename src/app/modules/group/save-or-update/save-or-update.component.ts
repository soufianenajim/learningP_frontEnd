import { Component, OnInit, Inject } from "@angular/core";
import { Group } from "../../../core/models/group.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GroupService } from "../../../core/services/group/group.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { LevelService } from "../../../core/services/level/level.service";
import { BranchService } from "../../../core/services/branch/branch.service";
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
  groupForm = new FormGroup({
    name: new FormControl("",[Validators.required,this.noWhitespaceValidator]),
    level: new FormControl(null,Validators.required),
    branch: new FormControl(null,Validators.required),
  });
 
  listLevel = [];

  listBranch = [];
  listProfessor = [];

  idGroup = null;
  isEdit = false;
  isClickSave = false;
  private readonly notifier: NotifierService;
  constructor(
    private groupService: GroupService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    private levelService: LevelService,
    private branchService: BranchService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private translateService:TranslateService,
     notifierService: NotifierService
  ) {
    this.notifier=notifierService;
    if (data !== null) {
      this.isEdit = true;
      this.idGroup = data.id;
      const name = data.name;
      const level = data.level;
      const branch = data.branch;
  
      console.log("data", data);
      console.log("level", level);
      this.groupForm.get("name").setValue(name);
      this.groupForm.get("level").setValue(level);
      this.groupForm.get("branch").setValue(branch);
    
      console.log('form',this.groupForm.value)

    }
  }

  ngOnInit() {
    const user = this.tokenStorageService.getUser();

    this.levelService
      .findByOrganisation(user.organization.id)
      .subscribe((response: any) => {
        console.log("response", response);
        this.listLevel = response;
        this.branchService
          .findByOrganisation(user.organization.id)
          .subscribe((response: any) => {
            this.listBranch = response;
           
          });
      });
  }
  save() {
    this.isClickSave=true;
    const name = this.groupForm.get("name").value;
    const level = this.groupForm.get("level").value;
    const branch = this.groupForm.get("branch").value;
    let group = new Group();
    group.id = this.idGroup;
    group.name = name;
    group.level = level;
    group.branch = branch;
    console.log("group", group);

   if(this.groupForm.valid){
      this.groupService.saveOrUpdate(group).subscribe( 
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

  compareBranch(c1: any, c2: any): boolean {
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
      this.groupForm.get(field).hasError("required") &&
      (this.groupForm.get(field).touched || this.isClickSave)
    );
  }
  invalidData(field: string) {
    return (
      this.groupForm.get(field).hasError("whitespace") &&
      !this.groupForm.get(field).hasError("required") &&
      (this.groupForm.get(field).touched || this.isClickSave)
    );
  }
  successNotifaction() {
    this.translateService
      .get("GROUP.SAVE_SUCCESS")
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
    this.translateService.get("GROUP.EXIST").subscribe((value: string) => {
      this.showNotification("error", value);
    });
  }

}
