import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard/dashboard.service';
import { ProgressionModuleService } from '../../../core/services/progression_module/progression-module.service';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css']
})
export class DashboardStudentComponent implements OnInit {
  listModule=[];
  countModule;
  countExam;
  countQuiz;
  countCatchingUp;
  countCour;
  @Input() user;
  constructor(private dashboardService:DashboardService,private progressionModuleService:ProgressionModuleService) { }

  ngOnInit() {
    this.progressionModuleService.getModuleByStudent(this.user.id).subscribe((resp:any)=>{
    this.listModule=resp;
    })
    this.countModule = this.dashboardService.countModuleByStudent(this.user.id);
    this.countExam = this.dashboardService.countExamByStudentAndModuleAndType(
      this.user.id,
      0,
      "EXAM"
    );
    this.countCatchingUp=this.dashboardService.countExamByStudentAndModuleAndType(
      this.user.id,
      0,
      "CATCHING_UP"
    );
    this.countQuiz = this.dashboardService.countExamByStudentAndModuleAndType(
      this.user.id,
      0,
      "QUIZ"
    );
    this.countCour = this.dashboardService.countCourseByStudentAndModule(
      this.user.id,
      0
    );
  }

  onChangeModuleExam(event) {
    console.log('event',event);
   this.countExam= this.dashboardService.countExamByStudentAndModuleAndType(
      this.user.id,
      event,
      "EXAM"
    );
  }
  onChangeModuleQuiz(event) {
    console.log('event',event);
    this.countQuiz = this.dashboardService.countExamByStudentAndModuleAndType(
      this.user.id,
      event,
      "QUIZ"
    );
  }

  onChangeModuleCour(event) {
    this.countCour = this.dashboardService.countCourseByStudentAndModule(
      this.user.id,
      event
    );
  }
  onChangeModuleCatchingUp(event) {
    this.countCatchingUp = this.dashboardService.countExamByStudentAndModuleAndType(
      this.user.id,
      event,
      "CATCHING_UP"
    );
  }

}
