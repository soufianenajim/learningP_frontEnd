import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LevelRoutingModule } from './level-routing.module';
import { ListComponent } from './list/list.component';
import { SaveOrUpdateComponent } from './save-or-update/save-or-update.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    LevelRoutingModule,
    SharedModule
  ],

  declarations: [ListComponent, SaveOrUpdateComponent, DetailComponent],

  entryComponents : [DetailComponent, SaveOrUpdateComponent]
})
export class LevelModule { }
