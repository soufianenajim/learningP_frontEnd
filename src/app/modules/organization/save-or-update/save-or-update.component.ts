import { Component, OnInit, Inject } from "@angular/core";
import { Organization } from "../../../core/models/organization.model";
import { FormGroup, FormControl, FormBuilder, FormArray } from "@angular/forms";
import { OrganizationService } from "../../../core/services/organization/organization.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { LevelService } from "../../../core/services/level/level.service";
import { BranchService } from "../../../core/services/branch/branch.service";
import { isBuffer } from "util";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  organizationForm: FormGroup;

  idOrganization = null;
  isEdit = false;
  constructor(
    private organizationService: OrganizationService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    private fb: FormBuilder,
    private levelService: LevelService,
    private branchService: BranchService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.organizationForm = this.fb.group({
      name: new FormControl(""),
      branchs: this.fb.array([]),
      levels: this.fb.array([]),
    });

    if (data !== null) {
      this.isEdit = true;
      this.idOrganization = data.id;
      const name = data.name;

      this.buildForm(data);
    }
  }

  buildForm(data) {
    this.organizationForm.get("name").setValue(data.name);
    let branchs = data.branchs;
    let levels = data.levels;
    if (branchs) {
      for (let d of data.branchs) {
        console.log("d", d);
        this.branchs.push(
          this.fb.group({
            id: new FormControl(d.id),
            name: new FormControl(d.name),
          })
        );
      }
    }
    if (levels) {
      for (let d of data.levels) {
        console.log("d", d);
        this.levels.push(
          this.fb.group({
            id: new FormControl(d.id),
            name: new FormControl(d.name),
          })
        );
      }
    }
  }

  //Level---------
  public get levels(): FormArray {
    return this.organizationForm.get("levels") as FormArray;
  }
  newLevel(): FormGroup {
    return this.fb.group({
      id: new FormControl(null),
      name: new FormControl(""),
    });
  }

  addLevels() {
    this.levels.push(this.newLevel());
  }

  removeLevel(i: number) {
    if (this.isEdit) {
      const id = this.levels.at(i).value.id;
      if (id != null) {
        this.levelService.delete(id).subscribe((resp) => {
          this.levels.removeAt(i);
        });
      } else {
        this.levels.removeAt(i);
      }
    } else {
      this.levels.removeAt(i);
    }
  }

  //Branch -------------

  public get branchs(): FormArray {
    return this.organizationForm.get("branchs") as FormArray;
  }
  newBranch(): FormGroup {
    return this.fb.group({
      id: new FormControl(null),
      name: new FormControl(""),
    });
  }

  addBranchs() {
    this.branchs.push(this.newBranch());
  }

  removeBranch(i: number) {
    if (this.isEdit) {
      const id = this.branchs.at(i).value.id;
      if (id != null) {
        this.branchService.delete(id).subscribe((resp) => {
          this.branchs.removeAt(i);
        });
      } else {
        this.branchs.removeAt(i);
      }
    } else {
      this.branchs.removeAt(i);
    }
  }
  ngOnInit() {}
  save() {
    const name = this.organizationForm.get("name").value;
    const branchs = this.organizationForm.get("branchs").value;
    const levels = this.organizationForm.get("levels").value;
    let organization = new Organization();
    organization.id = this.idOrganization;
    organization.name = name;
    organization.branchs = branchs;
    organization.levels = levels;
    this.organizationService.saveOrUpdate(organization).subscribe((resp) => {
      console.log("response  ----", resp);
      this.dialogRef.close(true);
    });
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
