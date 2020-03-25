import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteExamRoutingModule } from './note-exam-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    NoteExamRoutingModule
  ],
  declarations: [ListComponent]
})
export class NoteExamModule { }
