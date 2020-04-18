import { Component, OnInit, Inject } from "@angular/core";
import { User } from "../../../core/models/user.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../../../core/services/user/user.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { LevelService } from "../../../core/services/level/level.service";
import { BranchService } from "../../../core/services/branch/branch.service";
import { OrganizationService } from "../../../core/services/organization/organization.service";
import { RoleService } from "../../../core/services/role/role.service";
import { sharedConstants } from "../../../core/constants";
import { NotifierService } from 'angular-notifier';
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  private readonly notifier: NotifierService;
  userForm = new FormGroup({
    firstName: new FormControl("",[Validators.required, this.noWhitespaceValidator]),
    lastName: new FormControl("",[Validators.required, this.noWhitespaceValidator]),
    email: new FormControl("",[
      Validators.required,
      this.noWhitespaceValidator,
      Validators.pattern(sharedConstants.EMAIL_PATTERN)]),
    phone:new FormControl("",[this.noWhitespaceValidator,Validators.pattern(sharedConstants.PHONE_PATTERN)]),
    organization: new FormControl(null,Validators.required),
    role: new FormControl(null,Validators.required),
    level: new FormControl(null,Validators.required),
    branch: new FormControl(null,Validators.required),
  });
  listLevel = [];

  listBranch = [];
  listOrganization = [];
  listRole = [];
  idUser = null;
  isEdit = false;
  isStudent = false;
  isClickSave = false;
  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    private levelService: LevelService,
    private branchService: BranchService,
    private organizationService: OrganizationService,
    private roleService: RoleService,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    notifierService: NotifierService
  ) {
    this.notifier=notifierService;
    if (data !== null) {
      this.isEdit = true;
      this.idUser = data.id;
      const name = data.name;
      this.buildForm(data);
    }
  }
  buildForm(data) {
    this.userForm.get("firstName").setValue(data.firstName);
    this.userForm.get("lastName").setValue(data.lastName);
    this.userForm.get("email").setValue(data.email);
    this.userForm.get("phone").setValue(data.phone);
    this.userForm.get("organization").setValue(data.organization);
    this.userForm.get("role").setValue(data.refRole);
    this.userForm.get("level").setValue(data.level);
    this.userForm.get("branch").setValue(data.branch);
    this.onSelectRole();
    this.onSelectOgra();
  }
  ngOnInit() {
    this.organizationService.findAll().subscribe((res: any) => {
      this.listOrganization = res;
      this.roleService.findAll().subscribe((resp: any) => {
        this.listRole = resp;
      });
    });
  }
  save() {
    this.isClickSave=true;
    const email = this.userForm.get("email").value;
    const firstName = this.userForm.get("firstName").value;
    const lastName = this.userForm.get("lastName").value;
    const phone = this.userForm.get("phone").value;
    const organization = this.userForm.get("organization").value;
    const role = this.userForm.get("role").value;
    const level = this.userForm.get("level").value;
    const branch = this.userForm.get("branch").value;

    let user = new User();
    user.id = this.idUser;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone=phone;
    user.organization = organization;
    user.refRole = role;
    user.level = level;
    user.branch = branch;
    console.log('user',user);
    if(this.userForm.valid){
      this.userService.saveOrUpdate(user).subscribe((resp) => {
       //shofi hna
        this.successNotifaction();
      },error=>{
       this.erorrNotifaction(error);
      });
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
      this.levelService.findByOrganisation(orga.id).subscribe((resp: any) => {
        this.listLevel = resp;
        this.branchService
          .findByOrganisation(orga.id)
          .subscribe((resp: any) => {
            this.listBranch = resp;
          });
      });
    }
  }
  onSelectRole() {
    const role = this.userForm.get("role").value;
    if (role) this.isStudent = role.name === "ROLE_STUDENT";
  }
  public noWhitespaceValidator(control: FormControl) {
    if (control.value === '') {
      return null;
    }
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  errormptyField(field: string) {
    return this.userForm.get(field).hasError('required') && (this.userForm.get(field).touched || this.isClickSave)
  }
  invalidData(field: string) {
    return this.userForm.get(field).hasError('whitespace') && !this.userForm.get(field).hasError('required')
      && (this.userForm.get(field).touched || this.isClickSave);
  }
  successNotifaction() {
    this.translateService.get('USER.SAVE_SUCCESS').subscribe((value: string) => {
      this.showNotification('success', value);
      setTimeout(() => {
        this.dialogRef.close(true);

      },
        1000);
    });
  }
  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
  erorrNotifaction(err) {
    this.translateService.get(err).subscribe((value: string) => {
      this.showNotification('error', value);
    });
  }

}

