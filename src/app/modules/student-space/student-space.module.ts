import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentSpaceRoutingModule } from './student-space-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../../shared/shared.module';
import { ProgressionCourComponent } from './progression-cour/progression-cour.component';

@NgModule({
  imports: [
    CommonModule,
    StudentSpaceRoutingModule,
    SharedModule
  ],
  entryComponents:[ProgressionCourComponent],
  declarations: [ListComponent, ProgressionCourComponent]
})
export class StudentSpaceModule { }
