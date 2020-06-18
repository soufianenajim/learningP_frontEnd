import { Component, OnInit, Input } from "@angular/core";
import { DashboardService } from "../../../core/services/dashboard/dashboard.service";
import { BranchService } from "../../../core/services/branch/branch.service";
import { GroupService } from "../../../core/services/group/group.service";
import { LevelService } from "../../../core/services/level/level.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-dashboard-client-admin",
  templateUrl: "./dashboard-client-admin.component.html",
  styleUrls: ["./dashboard-client-admin.component.css"],
})
export class DashboardClientAdminComponent implements OnInit {
  listGroup = [];
  listBranch = [];
  listLevel = [];
  countStudent;
  countTeacher;
  countModule;
  countLevel;
  countBranch;
  countGroup;
  @Input() user;
  searchForm = new FormGroup({
    group: new FormControl(null),
    level: new FormControl(null),
    branch: new FormControl(null),
  });
  constructor(
    private dashboardService: DashboardService,
    private branchService: BranchService,
    private levelService: LevelService,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.groupService
      .findByOrganization(this.user.organization.id)
      .subscribe((resp: any) => {
        this.listGroup = resp;
        console.log("resp", resp);
        this.branchService
          .findByOrganisation(this.user.organization.id)
          .subscribe((resp: any) => {
            console.log("resp", resp);
            this.listBranch = resp;
            this.levelService
              .findByOrganisation(this.user.organization.id)
              .subscribe((resp: any) => {
                console.log("resp", resp);
                this.listLevel = resp;
              this.search();
              });
          });
      });
  }
  onClearLevel() {
    this.searchForm.get("level").setValue(null);
  }
  onClearBranch() {
    this.searchForm.get("branch").setValue(null);
  }
  onClearGroup() {
    this.searchForm.get("group").setValue(null);
  }
  
  search(){
    const idLevel=this.searchForm.get('level').value?this.searchForm.get('level').value.id:0;
    const idBranch=this.searchForm.get('branch').value?this.searchForm.get('branch').value.id:0;
    const idGroup=this.searchForm.get('group').value?this.searchForm.get('group').value.id:0;
    this.countStudent=this.dashboardService.countUseryOrganizationAndLevelAndBranch(this.user.organization.id,idLevel,idBranch,idGroup,"ROLE_STUDENT");
    this.countTeacher=this.dashboardService.countUseryOrganizationAndLevelAndBranch(this.user.organization.id,idLevel,idBranch,idGroup,"ROLE_TEACHER");
    this.countModule=this.dashboardService.countModuleyOrganizationAndLevelAndBranchAndGroup(this.user.organization.id,idLevel,idBranch,idGroup);
    this.countLevel=this.dashboardService.countLevelByOrganization(this.user.organization.id);
    this.countBranch=this.dashboardService.countBranchByOrganization(this.user.organization.id);
    this.countGroup=this.dashboardService.countGroupByOrganizationAndLevelAndBranch(this.user.organization.id,idLevel,idBranch);

  }
  reset(){
    this.onClearBranch();
    this.onClearGroup();
    this.onClearLevel();
    this.search();

  }
}
