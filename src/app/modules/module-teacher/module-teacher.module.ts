import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleTeacherRoutingModule } from './module-teacher-routing.module';
import { ListComponent } from './list/list.component';
import { ModuleModule } from '../module/module.module';

@NgModule({
  imports: [
    CommonModule,
    ModuleTeacherRoutingModule,
    ModuleModule
  ],
  declarations: [ListComponent]
})
export class ModuleTeacherModule { }
