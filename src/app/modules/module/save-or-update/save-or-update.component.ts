import { Component, OnInit, Inject } from "@angular/core";
import { Module } from "../../../core/models/module.model";
import { FormGroup, FormControl } from "@angular/forms";
import { ModuleService } from "../../../core/services/module/module.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { LevelService } from "../../../core/services/level/level.service";
import { BranchService } from "../../../core/services/branch/branch.service";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
import { UserService } from "../../../core/services/user/user.service";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  moduleForm = new FormGroup({
    name: new FormControl(""),
    prof: new FormControl(null),
    level: new FormControl(null),
    branch: new FormControl(null),
  });
  listLevel = [];

  listBranch = [];
  listProfessor = [];

  idModule = null;
  isEdit = false;
  constructor(
    private moduleService: ModuleService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    private levelService: LevelService,
    private branchService: BranchService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tokenStorageService: TokenStorageService,
    private userService: UserService
  ) {
    if (data !== null) {
      this.isEdit = true;
      this.idModule = data.id;
      const name = data.name;
      const level=data.level
      const branch =data.branch;
      const prof=data.professor;

      this.moduleForm.get("name").setValue(name);
      this.moduleForm.get("level").setValue(level);
      this.moduleForm.get("branch").setValue(branch);
      this.moduleForm.get("prof").setValue(prof);
      
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
            this.userService
              .findAllProfessorByOrga(user.organization.id)
              .subscribe((resp:any) => {
                this.listProfessor = resp;
              });
          });
      });
  }
  save() {
    const name = this.moduleForm.get("name").value;
    const level = this.moduleForm.get("level").value;
    const branch = this.moduleForm.get("branch").value;
    const professor=this.moduleForm.get("prof").value;
    let module = new Module();
    module.id = this.idModule;
    module.name = name;
    module.level = level;
    module.branch = branch;
    module.professor=professor;
    console.log('module',module);
    this.moduleService.saveOrUpdate(module).subscribe((resp) => {
      console.log("response  ----", resp);
      this.dialogRef.close(true);
    });
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
}
