import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { FormGroup, FormControl } from "@angular/forms";
import { User } from "../../../core/models/user.model";
import { Role } from "../../../core/models/role.model";
import { Demande } from "../../../core/models/demande.model";
import { UserService } from "../../../core/services/user/user.service";
import { DetailComponent } from "../detail/detail.component";
import { SaveOrUpdateComponent } from "../save-or-update/save-or-update.component";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { RoleService } from "../../../core/services/role/role.service";
import { OrganizationService } from "../../../core/services/organization/organization.service";
import { LevelService } from "../../../core/services/level/level.service";
import { BranchService } from "../../../core/services/branch/branch.service";
import { GroupService } from "../../../core/services/group/group.service";
import swal from "sweetalert2";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [
    "email",
    "firstName",
    "lastName",
    "organization",
    "role",
    "group",

    "actions",
  ];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<User>;
  demandeUser: Demande<User> = new Demande<User>();

  user: User = new User();
  resultsLength;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listProfessor;
  listLevel = [];

  listBranch = [];
  listOrganization = [];
  listRole: Role[];
  listGroup = [];
  userForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    organization: new FormControl(null),
    role: new FormControl(null),
    group: new FormControl(null),
  });
  lang = "en";
  actionDeleted;
  userDeleted;
  isClientAdmin = false;
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private organizationService: OrganizationService,
    private roleService: RoleService,
    private groupService: GroupService,
    private tokenStorageService: TokenStorageService
  ) {}
  ngOnInit() {
    const user = this.tokenStorageService.getUser();
    if (user.refRole.name === "ROLE_ADMIN_CLIENT") {
      this.isClientAdmin = true;
      this.userForm.get("organization").setValue(user.organization);
      this.onSelectOgra();
    }
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
      this.userForm.get("role").setValue(null);
      this.getRoles();
      this.search(true);
    });
    this.actionDeleted = this.getI18n("ACTION.DELETED");
    this.userDeleted = this.getI18n("USER.DELETED");
    this.organizationService.findAll().subscribe((res: any) => {
      this.listOrganization = res;
      this.getRoles();
      this.search(false);
    });
  }
  transalteRoles() {
    this.listRole.sort();

    for (const role of this.listRole) {
      role.translated = this.getRoleName(role.name);
    }

    this.listRole.sort((a, b) => a.translated.localeCompare(b.translated));
  }
  getRoles() {
    if (!this.isClientAdmin) {
      this.roleService.findAll().subscribe((resp: any) => {
        this.listRole = resp;
        this.transalteRoles();
      });
    }
    else{
      this.roleService.findAllClient().subscribe((resp: any) => {
        this.listRole = resp;
        this.transalteRoles();
      });
    }
  }
  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const email = this.userForm.get("email").value;
    const firstName = this.userForm.get("firstName").value;
    const lastName = this.userForm.get("lastName").value;
    const organization = this.userForm.get("organization").value;
    const role = this.userForm.get("role").value;
    const group = this.userForm.get("group").value;
    this.user.firstName = firstName;
    this.user.email = email;
    this.user.lastName = lastName;
    this.user.organization =
      organization === "" || organization === null ? null : organization;
    this.user.refRole = role === "" || role === null ? null : role;
    this.user.groupId = group != null ? group.id : null;
    this.demandeUser.model = this.user;
    this.demandeUser.page = page;
    this.demandeUser.size = size;

    this.searchByCritere(this.demandeUser);
  }

  searchByCritere(demande: Demande<User>) {
    console.log("demandeUser --------", demande);
    this.userService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("users from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<User>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.userForm.get("email").setValue("");
    this.userForm.get("firstName").setValue("");
    this.userForm.get("lastName").setValue("");
    this.userForm.get("role").setValue(null);
    if(!this.isClientAdmin)
    this.userForm.get("organization").setValue(null);
    this.userForm.get("group").setValue(null);

    this.search(false);
  }
  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
  }

  openDialogDetail(row) {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: "60%",
      data: row,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(
        "result mn dialog detail afakom rkzo m3ana   -----------",
        result
      );
    });
  }
  openDialog(data) {
    console.log("data", data);
    const dialogRef = this.dialog.open(SaveOrUpdateComponent, {
      width: "60%",
      data: data,
      disableClose: true,
      autoFocus: false,
      maxHeight: "90vh",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.search(false);
      }

      console.log("The dialog was closed");
    });
  }
  delete(row) {
    this.userService.delete(row.id).subscribe(
      (response) => {
        console.log("response", response);
        this.search(true);
      },
      (error) => {
        console.log("error", error);
      }
    );
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
  onSelectOgra() {
    const orga = this.userForm.get("organization").value;
    if (orga) {
      this.groupService.findByOrganization(orga.id).subscribe((resp: any) => {
        this.listGroup = resp;
      });
    }
  }
  compareBranch(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  compareLevel(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  getGroup(groups) {
    if (groups != null && groups.length > 0) {
      let group = "";
      groups.forEach((element) => {
        group += element.name;
      });
      return group;
    }
    return "---";
  }
  openDialogDelete(user) {
    let actionDeleted = this.getI18n("ACTION.DELETED");
    let moduleDeleted = this.getI18n("MODULE.DELETED");
    swal({
      title: this.getI18n("MODULE.DELETE"),
      text: this.getI18n("ACTION.CONFIRMATION_MESSAGE"),
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: this.getI18n("ACTION.CONFIRMATION"),
      cancelButtonText: this.getI18n("ACTION.CANCEL_CONFIRMATION"),
      reverseButtons: false,
      focusCancel: true,
    })
      .then(() => this.delete(user))
      .then(function () {
        swal({
          title: actionDeleted,
          text: moduleDeleted,
          type: "success",
        });
      })
      .catch();
  }
  getI18n(name): string {
    let i18;
    this.translateService.get(name).subscribe((value: string) => {
      i18 = value;
    });
    return i18;
  }
}
