import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { SaveOrUpdateComponent } from './save-or-update/save-or-update.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule
  ],
  declarations: [ListComponent, DetailComponent, SaveOrUpdateComponent],
  entryComponents: [
    SaveOrUpdateComponent,
    DetailComponent
  ],


})
export class CourseModule {

 }
