import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleNameRoutingModule } from './module-name-routing.module';
import { SaveOrUpdateComponent } from './save-or-update/save-or-update.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ModuleNameRoutingModule,
    SharedModule
  ],

  declarations: [ListComponent, SaveOrUpdateComponent, DetailComponent],

  entryComponents : [DetailComponent, SaveOrUpdateComponent]
})
export class ModuleNameModule { }
