import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteExamRoutingModule } from './note-exam-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../../shared/shared.module';
import { PassExamComponent } from './pass-exam/pass-exam.component';
import { StudentSpaceModule } from '../student-space/student-space.module';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    NoteExamRoutingModule,
    SharedModule,
    StudentSpaceModule
  ],
  declarations: [ListComponent,PassExamComponent, DetailComponent],
  entryComponents:[PassExamComponent,DetailComponent],
  exports:[ListComponent]
})
export class NoteExamModule { }
