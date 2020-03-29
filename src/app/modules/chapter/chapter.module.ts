import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChapterRoutingModule } from './chapter-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { SaveOrUpdateComponent } from './save-or-update/save-or-update.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ChapterRoutingModule,
    SharedModule
  ],
  entryComponents: [
    SaveOrUpdateComponent,
    DetailComponent
  ],
  declarations: [ListComponent, DetailComponent, SaveOrUpdateComponent]
})
export class ChapterModule { }
