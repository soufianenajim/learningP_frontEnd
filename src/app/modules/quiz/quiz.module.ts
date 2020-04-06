import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { ListComponent } from './list/list.component';
import { SaveOrUpdateComponent } from './save-or-update/save-or-update.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../../shared/shared.module';
import { QuestionModule } from '../question/question.module';

@NgModule({
  imports: [
    CommonModule,
    QuizRoutingModule,
    SharedModule,
    QuestionModule
  ],
  declarations: [ListComponent, SaveOrUpdateComponent, DetailComponent],
  entryComponents: [
    SaveOrUpdateComponent,
    DetailComponent
  ],

})
export class QuizModule { }
