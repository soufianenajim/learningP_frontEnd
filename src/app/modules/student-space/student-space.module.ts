import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentSpaceRoutingModule } from './student-space-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../../shared/shared.module';
import { ProgressionCourComponent } from './progression-cour/progression-cour.component';
import { ReadCourComponent } from './progression-cour/read-cour/read-cour.component';
import { TdOrQuizComponent } from './progression-cour/read-cour/td-or-quiz/td-or-quiz.component';
import { PassExamComponent } from './pass-exam/pass-exam.component';

@NgModule({
  imports: [
    CommonModule,
    StudentSpaceRoutingModule,
    SharedModule
  ],
  entryComponents:[ProgressionCourComponent,ReadCourComponent,PassExamComponent],
  declarations: [ListComponent, ProgressionCourComponent, ReadCourComponent, TdOrQuizComponent, PassExamComponent]
})
export class StudentSpaceModule { }
