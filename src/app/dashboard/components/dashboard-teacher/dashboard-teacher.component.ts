import { Component, OnInit, Input } from "@angular/core";
import * as CanvasJS from "../../../../assets/js/canvasjs.min";
import { GroupService } from "../../../core/services/group/group.service";
import { DashboardService } from "../../../core/services/dashboard/dashboard.service";

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
  constructor(
    private groupService: GroupService,
    private dashboardService: DashboardService
  ) {}
  ngOnInit() {
    this.groupService.findByUser(this.user.id).subscribe((resp: any) => {
      this.listGroup = resp;
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
    const chart = new CanvasJS.Chart("chartContainer", {
      theme: "light1", // "light2", "dark1", "dark2"
      animationEnabled: false, // change to true
      title: {
        text: "Basic Column Chart",
      },
      data: [
        {
          // Change type to "bar", "area", "spline", "pie",etc.
          type: "column",
          dataPoints: [
            { label: "apple", y: 10 },
            { label: "orange", y: 15 },
            { label: "banana", y: 25 },
            { label: "mango", y: 30 },
            { label: "grape", y: 28 },
            { label: "jaliy", y: 28 },
            { label: "balit", y: 28 },
          ],
        },
      ],
    });
    chart.render();
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
}
