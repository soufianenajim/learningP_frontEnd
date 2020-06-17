import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import {SharedModule} from '../shared/shared.module';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { DashboardClientAdminComponent } from './components/dashboard-client-admin/dashboard-client-admin.component';
import { DashboardTechnicalAdminComponent } from './components/dashboard-technical-admin/dashboard-technical-admin.component';
import { EditComponent } from './components/cardEdit/edit.component';
import { DashCardsComponent } from './components/dash-cards/dash-cards.component';
import { ExamModule } from '../modules/exam/exam.module';
import { FutureTenseExamComponent } from './components/dashboard-teacher/future-tense-exam/future-tense-exam.component';
import { NoteExamModule } from '../modules/note-exam/note-exam.module';
import { LatestCourComponent } from './components/dashboard-student/latest-cour/latest-cour.component';
import { CourseModule } from '../modules/course/course.module';

@NgModule({
  imports: [
    //ExamModule,
    
      CommonModule,
      RouterModule.forChild(DashboardRoutes),
      SharedModule,
  ],
  declarations: [DashboardComponent, DashboardStudentComponent, DashboardTeacherComponent, DashboardClientAdminComponent, DashboardTechnicalAdminComponent,EditComponent, DashCardsComponent, FutureTenseExamComponent, LatestCourComponent]
})

export class DashboardModule {}
