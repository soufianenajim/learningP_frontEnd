import { Component, OnInit, Input } from "@angular/core";
import * as CanvasJS from "../../../../assets/js/canvasjs.min";
import { GroupService } from "../../../core/services/group/group.service";
import { DashboardService } from "../../../core/services/dashboard/dashboard.service";
import { ModuleService } from "../../../core/services/module/module.service";
import { FormGroup, FormControl } from "@angular/forms";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
export class DataBar {
  y: number;
  label: string;
  constructor(yAxi?: number, labelX?: string) {
    this.y = yAxi;
    this.label = labelX;
  }
}
export class DataPie extends DataBar{
  y: number;
  label: string;
  color:string
  constructor(yAxi?: number, labelX?: string,color?:string) {
  super(yAxi,labelX);
  this.color=color;
  }
}
@Component({
  selector: "app-dashboard-teacher",
  templateUrl: "./dashboard-teacher.component.html",
  styleUrls: ["./dashboard-teacher.component.css"],
})
export class DashboardTeacherComponent implements OnInit {
  countModule;
  countExam;
  countQuiz;
  countCour;
  countStudent;
  @Input() user;
  listGroupBar = [];
  listModuleBar = [];

  listGroupPie= [];
  listModulePie = [];
  barSearchForm = new FormGroup({
    group: new FormControl(null),
    module: new FormControl(null),
  });
  pieSearchForm = new FormGroup({
    group: new FormControl(null),
    module: new FormControl(null),
  });
  isBarChartExist = false;
  isPieChartExist = false;
  constructor(
    private groupService: GroupService,
    private dashboardService: DashboardService,
    private moduleService: ModuleService,
    private translateService:TranslateService
  ) {}
  ngOnInit() {
    this.getChartBar(this.user.id, 0,0);
    this.getChartPie(this.user.id,0,0);
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
     const groupBar=this.barSearchForm.get('group').value;
     const moduleBar=this.barSearchForm.get('module').value;
     const groupPie=this.pieSearchForm.get('group').value;
     const modulePie=this.pieSearchForm.get('module').value;
      this.getChartBar(this.user.id, groupBar?groupBar.id:0, moduleBar?moduleBar.id:0);
    this.getChartPie(this.user.id,groupPie?groupPie.id:0, modulePie?modulePie.id:0);
    });
   
    this.groupService.findByUser(this.user.id).subscribe((resp: any) => {
      this.listGroupBar = resp;
      this.listGroupPie=resp;
      this.moduleService.findByProfessor(this.user.id).subscribe((res: any) => {
        this.listModuleBar = res;
        this.listModulePie=res;
      });
    });
    this.countModule = this.dashboardService.countModuleByTeacherAndGroupe(
      this.user.id,
      0
    );
    this.countExam = this.dashboardService.countExamByTeacherAndGroupeAndType(
      this.user.id,
      0,
      "EXAM"
    );
    this.countQuiz = this.dashboardService.countExamByTeacherAndGroupeAndType(
      this.user.id,
      0,
      "QUIZ"
    );
    this.countCour = this.dashboardService.countCourByTeacherAndGroupe(
      this.user.id,
      0
    );
    this.countStudent = this.dashboardService.countStudentByTeacherAndGroupe(
      this.user.id,
      0
    );
  }
  toolTipContent(e) {
    var str = "";
    var total = 0;
    var str2, str3;
    for (var i = 0; i < e.entries.length; i++) {
      var str1 =
        '<span style= "color:' +
        e.entries[i].dataSeries.color +
        '"> ' +
        e.entries[i].dataSeries.name +
        "</span>: <strong>" +
        e.entries[i].dataPoint.y +
        "</strong>%<br/>";
      total = e.entries[i].dataPoint.y + total;
      str = str.concat(str1);
    }
    return str;
  }

  onChangeGroupModule(event) {
    this.countModule = this.dashboardService.countModuleByTeacherAndGroupe(
      this.user.id,
      event
    );
  }
  onChangeGroupExam(event) {
    this.countExam = this.dashboardService.countExamByTeacherAndGroupeAndType(
      this.user.id,
      event,
      "EXAM"
    );
  }
  onChangeGroupQuiz(event) {
    this.countQuiz = this.dashboardService.countExamByTeacherAndGroupeAndType(
      this.user.id,
      event,
      "QUIZ"
    );
  }

  onChangeGroupCour(event) {
    this.countCour = this.dashboardService.countCourByTeacherAndGroupe(
      this.user.id,
      event
    );
  }
  onChangeGroupStudent(event) {
    this.countStudent = this.dashboardService.countStudentByTeacherAndGroupe(
      this.user.id,
      event
    );
  }
  getChartBar(userId, groupId, moduleId) {
    this.dashboardService
      .getAverageGoodAndBadGrades(userId, groupId, moduleId)
      .subscribe((resp: any) => {
        if (resp.length >= 1) {
        
          this.isBarChartExist = true;
        } else {
          this.isBarChartExist = false;
        }
        this.constructorDataBarSuccessAndFailed(resp);
      });
  }
  getChartPie(userId, groupId, moduleId) {
    this.dashboardService
      .getAverageSuccessStudent(userId, groupId, moduleId)
      .subscribe((resp: any) => {
      
        if (resp.length >= 1) {
        
          this.isPieChartExist=true;
        }
        else{
          this.isPieChartExist=false;
        }
        this.constructorDataPieSuccessAndFailed(resp);
      });
  }
  constructorDataBarSuccessAndFailed(data) {
    let isEmpty=true;
    let dataSuccess: DataBar[] = [];
    let dataFailed: DataBar[] = [];
    data.forEach((element) => {
      const success = (element[2] / element[1]) * 100;
      const failed = 100 - success;
      const label = element[0];
      dataSuccess.push(new DataBar(success, label));
      dataFailed.push(new DataBar(failed, label));
    });
  
 isEmpty=dataSuccess.length===0 &&dataFailed.length===0;
    const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      // title: {
      //   text: "Rate success students  by exam or quiz",
      //   fontFamily: "arial black",
      //   fontColor: "#757575",
      //   fontSize: 20,
      // },
      axisX: {
        labelAngle: 150,
      },

      axisY: {
        valueFormatString: "#0",
        gridColor: "#B6B1A8",
        tickColor: "#B6B1A8",
        interval: 20,
        maximum: 100,
      },
      toolTip: {
        shared: true,
        content: this.toolTipContent,
      },
      data: !isEmpty?[
        {
          type: "stackedColumn",
          showInLegend: true,
          name: this.getI18n("DASHBOARD.TEACHER.BELOW_AVERAGE"),
          color: "rgba(255, 16, 16, 0.69)",
          dataPoints: dataFailed,
        },
        {
          type: "stackedColumn",
          showInLegend: true,
          color: "#2ecc71",
          name: this.getI18n("DASHBOARD.TEACHER.GREATHER_AVERAGE"),
          dataPoints: dataSuccess,
        },
      ]:null,
    });
    chart.render();
  }
  constructorDataPieSuccessAndFailed(data) {
    let dataSuccess: DataPie[] = [];
    if (data.length == 1) {
      data.forEach((element) => {
        const success = (element[2] * 100) / element[1];
        const failed = ((element[1] - element[2]) * 100) / element[1];
        const label = element[0];
        dataSuccess.push(new DataPie(success, this.getI18n("DASHBOARD.TEACHER.SUCCESS"),"#2ecc71"));
        dataSuccess.push(new DataPie(success, this.getI18n("DASHBOARD.TEACHER.FAILURE"),"rgba(255, 16, 16, 0.69)"));
      });
    } else if (data.length > 1) {
      let validatedStudent = 0;
      let notValidatedStudent = 0;
      data.forEach((element) => {
        validatedStudent += (element[2] * 100) / element[1];
        notValidatedStudent += ((element[1] - element[2]) * 100) / element[1];
      });
      dataSuccess.push(new DataPie(validatedStudent / data.length, this.getI18n("DASHBOARD.TEACHER.SUCCESS"),"#2ecc71"));
      dataSuccess.push(
        new DataPie(notValidatedStudent / data.length, this.getI18n("DASHBOARD.TEACHER.FAILURE"),"rgba(255, 16, 16, 0.69)")
      );
    }
    
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
  //   onChangeGroupExamGraph(event){
  // this.getChartBar(this.user.id,event);
  //   }
  onChangeGroupBar() {
    const group = this.barSearchForm.get("group").value;
    this.barSearchForm.get("module").setValue(null);
    if(group){
      this.moduleService
      .findByProfessorAndGroup(this.user.id, group.id)
      .subscribe((resp: any) => {
        this.listModuleBar = resp;
        this.getChartBar(this.user.id, group ? group.id : 0, 0);
      });
    }
    else{
      this.moduleService
      .findByProfessor(this.user.id)
      .subscribe((resp: any) => {
        this.listModuleBar = resp;
        this.getChartBar(this.user.id, group ? group.id : 0, 0);
      });
    }
   
  }
  onChangeModuleBar() {
    const group = this.barSearchForm.get("group").value;
    const module = this.barSearchForm.get("module").value;
    this.getChartBar(
      this.user.id,
      group ? group.id : 0,
      module ? module.id : 0
    );
  }
  onClearGrouBar() {
    this.barSearchForm.get("group").setValue(null);
    const module = this.barSearchForm.get("module").value;
    this.getChartBar(this.user.id, 0, module ? module.id : 0);
  }
  onClearModuleBar() {
    this.barSearchForm.get("module").setValue(null);
    const group = this.barSearchForm.get("group").value;
    this.getChartBar(
      this.user.id,
      group ? group.id : 0,
      module ? module.id : 0
    );
  }
  onChangeGroupPie() {
    const group = this.pieSearchForm.get("group").value;
    this.barSearchForm.get("module").setValue(null);
    if(group){
      this.moduleService
      .findByProfessorAndGroup(this.user.id, group.id)
      .subscribe((resp: any) => {
        this.listModulePie = resp;
        this.getChartPie(this.user.id, group ? group.id : 0, 0);
      });
    }
    else{
      this.moduleService
      .findByProfessor(this.user.id)
      .subscribe((resp: any) => {
        this.listModulePie = resp;
        this.getChartPie(this.user.id, group ? group.id : 0, 0);
      });

    }
   
  }
  onChangeModulePie() {
    const group = this.pieSearchForm.get("group").value;
    const module = this.pieSearchForm.get("module").value;
    this.getChartPie(
      this.user.id,
      group ? group.id : 0,
      module ? module.id : 0
    );
  }
  onClearGrouPie() {
    this.pieSearchForm.get("group").setValue(null);
    const module = this.pieSearchForm.get("module").value;
    this.getChartPie(this.user.id, 0, module ? module.id : 0);
  }
  onClearModulePie() {
    this.pieSearchForm.get("module").setValue(null);
    const group = this.pieSearchForm.get("group").value;
    this.getChartPie(
      this.user.id,
      group ? group.id : 0,
      module ? module.id : 0
    );
  }
  getI18n(name): string {
    let i18;
    this.translateService.get(name).subscribe((value: string) => {
      i18 = value;
    });
    return i18;
  } 
}
