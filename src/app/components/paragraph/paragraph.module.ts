import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParagraphRoutingModule } from './paragraph-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    ParagraphRoutingModule
  ],
  declarations: [ListComponent]
})
export class ParagraphModule { }
