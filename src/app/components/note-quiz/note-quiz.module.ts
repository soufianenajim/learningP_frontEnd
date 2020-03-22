import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteQuizRoutingModule } from './note-quiz-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    NoteQuizRoutingModule
  ],
  declarations: [ListComponent]
})
export class NoteQuizModule { }
