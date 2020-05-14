import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { ListComponent } from './list/list.component';
import { SaveOrUpdateComponent } from './save-or-update/save-or-update.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../../shared/shared.module';
import { QuestionModule } from '../question/question.module';
import { ExercicesModule } from '../exercices/exercices.module';

@NgModule({
  imports: [
    CommonModule,
    ExamRoutingModule,
    SharedModule,
    QuestionModule,
    ExercicesModule
  ],
  declarations: [ListComponent, SaveOrUpdateComponent, DetailComponent],
  entryComponents: [SaveOrUpdateComponent,DetailComponent] 
})
export class ExamModule { }
