import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { UserService } from "../../../core/services/user/user.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Group } from "../../../core/models/group.model";
import { Demande } from "../../../core/models/demande.model";
import { GroupService } from "../../../core/services/group/group.service";
import { DetailComponent } from "../detail/detail.component";
import { SaveOrUpdateComponent } from "../save-or-update/save-or-update.component";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
import { LevelService } from "../../../core/services/level/level.service";
import { BranchService } from "../../../core/services/branch/branch.service";
import swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-group-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ["name", "level","branch", "actions"];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<Group>;

  demandeGroup: Demande<Group> = new Demande<Group>();

  group: Group = new Group();
  resultsLength;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listLevel = [];

  listBranch = [];
  groupForm = new FormGroup({
    name: new FormControl(""),
    level: new FormControl(null),
    branch: new FormControl(null),
  });
  constructor(
    private userService: UserService,
    private levelService:LevelService,
    private branchService:BranchService,
    private groupService: GroupService,
    private dialog: MatDialog,
    private tokenStorage:TokenStorageService,
    private translateService:TranslateService
  ) {}
  ngOnInit() {
    const user = this.tokenStorage.getUser();

    this.levelService
      .findByOrganisation(user.organization.id)
      .subscribe((response: any) => {
        console.log("response", response);
        this.listLevel = response;
        this.branchService
          .findByOrganisation(user.organization.id)
          .subscribe((response: any) => {
            this.listBranch = response;
           this.search(false);
          });
      });
  }
  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const name = this.groupForm.get("name").value;
    const level=this.groupForm.get("level").value;
    const branch=this.groupForm.get("branch").value;
    this.group.name = name;
    this.group.level=level;
    this.group.branch=branch;
 

    this.demandeGroup.model = this.group;
    this.demandeGroup.page = page;
    this.demandeGroup.size = size;

    this.searchByCritere(this.demandeGroup);
  }

  searchByCritere(demande: Demande<Group>) {
    console.log("demandeGroup --------", demande);
    this.groupService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("groups from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Group>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.groupForm.get("name").setValue("");
    this.groupForm.get("level").setValue(null);
    this.groupForm.get("branch").setValue(null);
    this.search(false);
  }
  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
  }


  openDialogDetail(row){
    const dialogRef = this.dialog.open(DetailComponent, {
      width: "60%",
      data: row,
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
     console.log('result mn dialog detail afakom rkzo m3ana   -----------',result);
  
    });
  }
  openDialog(data) {
    console.log("data", data);
    const dialogRef = this.dialog.open(SaveOrUpdateComponent, {
      width: "60%",
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.search(false);
      }
      
      console.log("The dialog was closed");
    });

  }
   delete(row) {
    this.groupService.delete(row.id).subscribe(
      response => {
        console.log("response", response);
        this.search(true);
      },
      error => {
        console.log("error", error);
      }
    );
  }
  compareBranch(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  compareLevel(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  openDialogDelete(group) {
    let actionDeleted=this.getI18n("ACTION.DELETED");
    let userDeleted= this.getI18n("GROUP.DELETED");
    swal({
      title: this.getI18n("GROUP.DELETE"),
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
      .then(() => this.delete(group))
      .then(function () {
        swal({
          title: actionDeleted,
          text:userDeleted,
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

