import { Component, OnInit, Input } from "@angular/core";
import * as CanvasJS from "../../../../assets/js/canvasjs.min";
import { GroupService } from "../../../core/services/group/group.service";
import { DashboardService } from "../../../core/services/dashboard/dashboard.service";
import { ModuleService } from "../../../core/services/module/module.service";
import { FormGroup, FormControl } from "@angular/forms";
export class Data{
  y:number;
  label:string 
  constructor(
    yAxi?:number,
    labelX?:string
  ){
   this.y=yAxi;
   this.label=labelX
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
  listGroup = [];
  listModule=[];
  searchForm = new FormGroup({
    group: new FormControl(null),
    module:new FormControl(null)
  });
  constructor(
    private groupService: GroupService,
    private dashboardService: DashboardService,
    private moduleService:ModuleService
  ) {}
  ngOnInit() {
    this.getChartBar(this.user.id,0,0);
   
    this.groupService.findByUser(this.user.id).subscribe((resp: any) => {
      this.listGroup = resp;
      this.moduleService.findByProfessor(this.user.id).subscribe((res:any) => {
        this.listModule = res;
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
    this.countStudent=this.dashboardService.countStudentByTeacherAndGroupe(this.user.id,0);

    
   
       const chart1 = new CanvasJS.Chart("chartContainer1", {
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Desktop Browser Market Share in 2016",
      },
      data: [
        {
          type: "pie",
          startAngle: 25,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: [
            { y: 51.08, label: "Rahma" },
            { y: 27.34, label: "Meska Rahma" },
            { y: 10.62, label: "Karami" },
            { y: 5.02, label: "Meska karami" },
            { y: 4.07, label: "afak" },
            { y: 1.22, label: "afak meska" },
            { y: 0.44, label: "iwaaaaa" },
          ],
        },
      ],
    });
    chart1.render();
  }
  toolTipContent(e) {
    var str = "";
    var total = 0;
    var str2, str3;
    for (var i = 0; i < e.entries.length; i++){
      var  str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\"> "+e.entries[i].dataSeries.name+"</span>: <strong>"+e.entries[i].dataPoint.y+"</strong>%<br/>";
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
  onChangeGroupStudent(event){
    this.countStudent=this.dashboardService.countStudentByTeacherAndGroupe(this.user.id,event);
  }
  getChartBar(userId,groupId,moduleId){
    this.dashboardService.getAverageGoodAndBadGrades(userId,groupId,moduleId).subscribe(resp=>{
      console.log('resp',resp);
      this.constructorDataSuccessAndFailed(resp)
    })
  }
  constructorDataSuccessAndFailed(data){
   let dataSuccess:Data[]=[];
   let dataFailed:Data[]=[];
    data.forEach(element => {
      const success=(element[2]/element[1])*100;
      const failed=100-success;
      const label=element[0];
       dataSuccess.push(new Data(success,label));
       dataFailed.push(new Data(failed,label))
     });
   

    const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title:{
        text: "Average students grades by exam and quiz",
        fontFamily: "arial black",
        fontColor: "#757575",
        fontSize:20
      },
      axisX:{
        labelAngle: 150,
      },
      
      axisY:{
        valueFormatString:"#0",
        gridColor: "#B6B1A8",
        tickColor: "#B6B1A8",
        interval:20,
        maximum:100
      },
      toolTip: {
        shared: true,
        content: this.toolTipContent
      },
      data: [
        {        
          type: "stackedColumn",
          showInLegend: true,
          name: "Moins que moyen",
          color: "#ff7373",
          dataPoints: 
           dataFailed
          
        },
        {
          type: "stackedColumn",
          showInLegend: true,
          color: "#50C878",
          name: "plus que moyen",
          dataPoints: dataSuccess
          },
        ]
    });
    chart.render();
  }
//   onChangeGroupExamGraph(event){
// this.getChartBar(this.user.id,event);
//   }
  onChangeGroupBar(){
    const group=this.searchForm.get('group').value;
    this.searchForm.get('module').setValue(null);
    this.moduleService.findByProfessorAndGroup(this.user.id,group.id).subscribe((resp:any)=>{
      this.listModule=resp;
      this.getChartBar(this.user.id,group?group.id:0,0);
    })
 
  }
  onChangeModulePie(){
    const group=this.searchForm.get('group').value;
    const module=this.searchForm.get('module').value;
      this.getChartBar(this.user.id,group?group.id:0,module?module.id:0);
  }
  onClearGrouBar(){
    this.searchForm.get('group').setValue(null);
    const module=this.searchForm.get('module').value;
    this.getChartBar(this.user.id,0,module?module.id:0);
  }
  onClearModulePie(){
    this.searchForm.get('module').setValue(null);
    const group=this.searchForm.get('group').value;
    this.getChartBar(this.user.id,group?group.id:0,module?module.id:0);
  }
  onChangeModuleBar(){
    // const module=this.searchForm.get('module').value;
    // this.getChartBar(this.user.id,group.id);
  }
}
