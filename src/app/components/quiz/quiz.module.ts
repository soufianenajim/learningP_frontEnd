import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    QuizRoutingModule
  ],
  declarations: [ListComponent]
})
export class QuizModule { }
