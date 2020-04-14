import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentSpaceRoutingModule } from './student-space-routing.module';
import { ListComponent } from './list/list.component';
import { ModuleModule } from '../module/module.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    StudentSpaceRoutingModule,
    SharedModule
  ],
  declarations: [ListComponent]
})
export class StudentSpaceModule { }
