import { Component, OnInit, Inject } from "@angular/core";
import { Module } from "../../../core/models/module.model";
import { FormGroup, FormControl } from "@angular/forms";
import { ModuleService } from "../../../core/services/module/module.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { LevelService } from "../../../core/services/level/level.service";
import { BranchService } from "../../../core/services/branch/branch.service";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  moduleForm = new FormGroup({
    name: new FormControl(""),
    level: new FormControl(null),
    branch: new FormControl(null),
  });
  listLevel = [];

  listBranch = [];

  idModule = null;
  isEdit = false;
  constructor(
    private moduleService: ModuleService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    private levelService: LevelService,
    private branchService: BranchService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data !== null) {
      this.isEdit = true;
      this.idModule = data.id;
      const name = data.name;

      this.moduleForm.get("name").setValue(name);
    }
  }

  ngOnInit() {
    this.levelService.findAll().subscribe((response: any) => {
      console.log('response',response);
      this.listLevel = response;
      this.branchService.findAll().subscribe((response: any) => {
        this.listBranch = response;
      });
    });
  }
  save() {
    const name = this.moduleForm.get("name").value;
    const level = this.moduleForm.get("level").value;
    const branch = this.moduleForm.get("branch").value;
    let module = new Module();
    module.id = this.idModule;
    module.name = name;
    module.level = level;
    module.branch = branch;
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
