import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChapterRoutingModule } from './chapter-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  imports: [
    CommonModule,
    ChapterRoutingModule
  ],
  declarations: [ListComponent]
})
export class ChapterModule { }
