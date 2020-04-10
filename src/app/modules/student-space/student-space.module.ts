import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentSpaceRoutingModule } from './student-space-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    StudentSpaceRoutingModule
  ],
  declarations: [ListComponent]
})
export class StudentSpaceModule { }
