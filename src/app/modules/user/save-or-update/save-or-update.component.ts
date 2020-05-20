import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { User } from "../../../core/models/user.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../../../core/services/user/user.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { BranchService } from "../../../core/services/branch/branch.service";
import { OrganizationService } from "../../../core/services/organization/organization.service";
import { RoleService } from "../../../core/services/role/role.service";
import { sharedConstants } from "../../../core/constants";
import { NotifierService } from "angular-notifier";
import { TranslateService } from "@ngx-translate/core";
import { Branch } from "../../../core/models/branch.model";
import { GroupService } from "../../../core/services/group/group.service";
import { Group } from "../../../core/models/group.model";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  private readonly notifier: NotifierService;
  userForm = new FormGroup({
    firstName: new FormControl("", [
      Validators.required,
      this.noWhitespaceValidator,
    ]),
    lastName: new FormControl("", [
      Validators.required,
      this.noWhitespaceValidator,
    ]),
    email: new FormControl("", [
      Validators.required,
      this.noWhitespaceValidator,
      Validators.pattern(sharedConstants.EMAIL_PATTERN),
    ]),
    phone: new FormControl("", [
      this.noWhitespaceValidator,
      Validators.pattern(sharedConstants.PHONE_PATTERN),
    ]),
    organization: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required),
    group: new FormControl(null, Validators.required),
  });
  listLevel = [];

  listBranch = [];
  listOrganization = [];
  listGroup = [];
  listRole = [];
  idUser = null;
  isEdit = false;
  isStudent = false;
  isTeacher = false;
  isClickSave = false;
  isClientAdmin = false;
  groups = [];
  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    private groupService: GroupService,
    private organizationService: OrganizationService,
    private roleService: RoleService,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    notifierService: NotifierService,
    private tokenStorageService: TokenStorageService
  ) {
    this.notifier = notifierService;
    if (data !== null) {
      this.isEdit = true;
      this.idUser = data.id;
      this.buildForm(data);
    }
  }
  buildForm(data) {
    console.log("data", data);
    this.userForm.get("firstName").setValue(data.firstName);
    this.userForm.get("lastName").setValue(data.lastName);
    this.userForm.get("email").setValue(data.email);
    this.userForm.get("phone").setValue(data.phone);
    this.userForm.get("organization").setValue(data.organization);
    this.userForm.get("role").setValue(data.refRole);
    if (data.refRole.name === "ROLE_STUDENT") {
      this.isStudent = true;
      this.userForm.get("group").setValue(data.groups[0]);
    }

    if (data.refRole.name === "ROLE_TEACHER") {
      this.isTeacher = true;
      this.userForm.get("group").setValue(data.groups);
    }

    this.onSelectRole();
    this.onSelectOgra();
  }

  ngOnInit() {
    const user = this.tokenStorageService.getUser();
    if (user.refRole.name === "ROLE_ADMIN_CLIENT") {
      this.isClientAdmin = true;
      this.userForm.get("organization").setValue(user.organization);
    }
    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
      allowSelectAll: false,
    };
    if (!this.isClientAdmin) {
      this.organizationService.findAll().subscribe((res: any) => {
        this.listOrganization = res;
        this.roleService.findAll().subscribe((resp: any) => {
          this.listRole = resp;
          this.transalteRoles();
        });
      });
    } else {
      this.roleService.findAllClient().subscribe((resp: any) => {
        this.listRole = resp;
        this.transalteRoles();
        const orgaId = this.userForm.get("organization").value.id;
        this.getGroups(orgaId);
      });
    }
  }
  getGroups(idOrg) {
    this.groupService.findByOrganization(idOrg).subscribe((resp: any) => {
      this.listGroup = resp;
    });
  }
  transalteRoles() {
    this.listRole.sort();

    for (const role of this.listRole) {
      role.translated = this.getRoleName(role.name);
    }
    console.log("listRole", this.listRole);
    this.listRole.sort((a, b) => a.translated.localeCompare(b.translated));
  }
  getRoleName(role: String) {
    const rolei18 = role.replace("ROLE_", "ROLE.");
    let roleName;
    this.translateService.get(rolei18).subscribe((value: string) => {
      roleName = value;
      return value;
    });
    return roleName;
  }
  save() {
    this.isClickSave = true;
    const email = this.userForm.get("email").value;
    const firstName = this.userForm.get("firstName").value;
    const lastName = this.userForm.get("lastName").value;
    const phone = this.userForm.get("phone").value;
    const organization = this.userForm.get("organization").value;
    const role = this.userForm.get("role").value;
    let groups = [];

    if (this.isStudent) {
      groups.push(this.userForm.get("group").value);
    } else if (this.isTeacher) {
      groups = this.groups;
    } else {
      const group = new Group();
      this.userForm.get("group").setValue(group);
      groups = null;
    }
    let user = new User();
    user.id = this.idUser;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.organization = organization;
    user.refRole = role;
    user.groups = groups != null ? groups : null;
    console.log("user", user);
    if (this.userForm.valid) {
      this.userService.saveOrUpdate(user).subscribe(
        (resp) => {
          //shofi hna
          this.successNotifaction();
        },
        (error) => {
          this.erorrNotifaction(error);
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
  onSelectOgra() {
    const orga = this.userForm.get("organization").value;
    if (orga) {
      this.groupService.findByOrganization(orga.id).subscribe((resp: any) => {
        this.listGroup = resp;
        console.log("resp", resp);
      });
    }
  }
  onSelectRole() {
    const role = this.userForm.get("role").value;
    if (role) {
      this.isStudent = role.name === "ROLE_STUDENT";
      this.isTeacher = role.name === "ROLE_TEACHER";
    }
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
      this.userForm.get(field).hasError("required") &&
      (this.userForm.get(field).touched || this.isClickSave)
    );
  }
  invalidData(field: string) {
    return (
      this.userForm.get(field).hasError("whitespace") &&
      !this.userForm.get(field).hasError("required") &&
      (this.userForm.get(field).touched || this.isClickSave)
    );
  }
  successNotifaction() {
    this.translateService
      .get("USER.SAVE_SUCCESS")
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
  erorrNotifaction(err) {
    this.translateService.get(err).subscribe((value: string) => {
      this.showNotification("error", value);
    });
  }
  onItemSelect(item: any) {
    this.groups.push(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
