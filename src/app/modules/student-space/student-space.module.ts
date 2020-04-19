import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentSpaceRoutingModule } from './student-space-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../../shared/shared.module';
import { ProgressionCourComponent } from './progression-cour/progression-cour.component';
import { ReadCourComponent } from './progression-cour/read-cour/read-cour.component';
import { PassQuizComponent } from './progression-cour/pass-quiz/pass-quiz.component';

@NgModule({
  imports: [
    CommonModule,
    StudentSpaceRoutingModule,
    SharedModule
  ],
  entryComponents:[ProgressionCourComponent,ReadCourComponent],
  declarations: [ListComponent, ProgressionCourComponent, ReadCourComponent, PassQuizComponent]
})
export class StudentSpaceModule { }
