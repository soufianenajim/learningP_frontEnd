import { Component, OnInit, Input } from "@angular/core";
import { DashboardService } from "../../../core/services/dashboard/dashboard.service";
import { BranchService } from "../../../core/services/branch/branch.service";
import { GroupService } from "../../../core/services/group/group.service";
import { LevelService } from "../../../core/services/level/level.service";
import { FormGroup, FormControl } from "@angular/forms";
import * as CanvasJS from "../../../../assets/js/canvasjs.min";
import { DataPie } from "../dashboard-teacher/dashboard-teacher.component";
import { TranslateService } from "@ngx-translate/core";

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
  totalConnected;
  totalUser;
  @Input() user;
  isPieChartExist = false;
  searchForm = new FormGroup({
    group: new FormControl(null),
    level: new FormControl(null),
    branch: new FormControl(null),
  });
  constructor(
    private dashboardService: DashboardService,
    private branchService: BranchService,
    private levelService: LevelService,
    private groupService: GroupService,
     private translateService: TranslateService
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
   // this.countModule=this.dashboardService.countModuleyOrganizationAndLevelAndBranchAndGroup(this.user.organization.id,idLevel,idBranch,idGroup);
    this.countLevel=this.dashboardService.countLevelByOrganization(this.user.organization.id);
    this.countBranch=this.dashboardService.countBranchByOrganization(this.user.organization.id);
    this.countGroup=this.dashboardService.countGroupByOrganizationAndLevelAndBranch(this.user.organization.id,idLevel,idBranch);
    this.getChartPie(this.user.organization.id,idLevel,idBranch,idGroup);
    this.dashboardService.countOnlineUserByOrganization(this.user.organization.id).subscribe((resp:any)=>{
    this.totalConnected=0;
    this.totalUser=0;
      for (const iterator of resp) {
      console.log('iterator',iterator);
      this.totalUser += iterator[1];
      if(iterator[0]===true){
        this.totalConnected=iterator[1];
      }
        
      }  
      console.log('totalUser',this.totalUser);
      console.log('totalCone',this.totalConnected)
    })
  }
  getChartPie(orgId, levelId, branchId,groupId) {
    this.dashboardService
      .getAverageSuccessStudentByOrg(orgId, levelId, branchId,groupId)
      .subscribe((resp: any) => {
        if (resp.length >= 1) {
          this.isPieChartExist = true;
        } else {
          this.isPieChartExist = false;
        }
        this.constructorDataPieSuccessAndFailed(resp);
      });
  }
  constructorDataPieSuccessAndFailed(data) {
    let dataSuccess: DataPie[] = [];
    let total=0;
    data.forEach(element => {
      total+= element[1];
    });
      data.forEach((element) => {
        console.log('element',element);
        const type = element[0];
        const value = (element[1]*100)/total;
        let typeValue;
        let color;
        if (type === "SUCCESS") {
          typeValue = this.getI18n("DASHBOARD.TEACHER.SUCCESS");
          color = "#2ecc71";
        } else if (type === "CATCHING_UP") {
          typeValue = this.getI18n("DASHBOARD.TEACHER.CATCHING_UP");
          color = "#f1c40f";
        } else {
          typeValue = this.getI18n("DASHBOARD.TEACHER.FAILURE");
          color = "rgba(255, 16, 16, 0.69)";
        }
        dataSuccess.push(
          new DataPie(
            value,
            typeValue,
            color
          )
        );
       
      });
    
    console.log('dataSuccess',dataSuccess);
  
    const chart1 = new CanvasJS.Chart("chartContainer1", {
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      animationEnabled: true,
      // title: {
      //   text: "Global Rate success students"
      // },
      data: [
        {
          type: "pie",
          startAngle: 25,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: dataSuccess,
        },
      ],
    });
    chart1.render();
  }
  
  reset(){
    this.onClearBranch();
    this.onClearGroup();
    this.onClearLevel();
    this.search();

  }
  getI18n(name): string {
    let i18;
    this.translateService.get(name).subscribe((value: string) => {
      i18 = value;
    });
    return i18;
  }
}
