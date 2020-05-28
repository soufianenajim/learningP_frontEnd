import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { ListComponent } from './list/list.component';
import { SaveOrUpdateComponent } from './save-or-update/save-or-update.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../../shared/shared.module';
import { ExercicesModule } from '../exercices/exercices.module';
import { StudentComponent } from './student/student.component';
import { NoteExamModule } from '../note-exam/note-exam.module';

@NgModule({
  imports: [
    CommonModule,
    ExamRoutingModule,
    SharedModule,
    ExercicesModule,
    NoteExamModule
  ],exports:[
    ListComponent
  ],
  declarations: [ListComponent, SaveOrUpdateComponent, DetailComponent, StudentComponent],
  entryComponents: [SaveOrUpdateComponent,DetailComponent,StudentComponent] 
})
export class ExamModule { }
