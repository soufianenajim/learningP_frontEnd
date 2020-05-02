import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SaveOrUpdateComponent } from './save-or-update/save-or-update.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [CommonModule, SharedModule, GroupRoutingModule],
  entryComponents: [
    SaveOrUpdateComponent,
    DetailComponent
  ],
 
  declarations: [ListComponent, SaveOrUpdateComponent, DetailComponent]
})
export class GroupModule { }
