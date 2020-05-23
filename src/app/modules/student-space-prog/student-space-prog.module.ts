import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentSpaceProgRoutingModule } from './student-space-prog-routing.module';
import { ListComponent } from './list/list.component';
import { StudentSpaceModule } from '../student-space/student-space.module';

@NgModule({
  imports: [
    CommonModule,
    StudentSpaceProgRoutingModule,
    StudentSpaceModule
  ],
  declarations: [ListComponent]
})
export class StudentSpaceProgModule { }
