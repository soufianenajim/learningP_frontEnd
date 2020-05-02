import { Component, OnInit, Inject } from "@angular/core";
import { Group } from "../../../core/models/group.model";
import { FormGroup, FormControl } from "@angular/forms";
import { GroupService } from "../../../core/services/group/group.service";
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
  groupForm = new FormGroup({
    name: new FormControl(""),
    level: new FormControl(null),
    branch: new FormControl(null),
  });
  listLevel = [];

  listBranch = [];
  listProfessor = [];

  idGroup = null;
  isEdit = false;
  constructor(
    private groupService: GroupService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    private levelService: LevelService,
    private branchService: BranchService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tokenStorageService: TokenStorageService,
    private userService: UserService
  ) {
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
    const name = this.groupForm.get("name").value;
    const level = this.groupForm.get("level").value;
    const branch = this.groupForm.get("branch").value;
    let group = new Group();
    group.id = this.idGroup;
    group.name = name;
    group.level = level;
    group.branch = branch;
    console.log("group", group);
    this.groupService.saveOrUpdate(group).subscribe((resp) => {
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
  compareOrg(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
