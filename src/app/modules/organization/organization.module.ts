import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { ListComponent } from './list/list.component';
import { SaveOrUpdateComponent } from './save-or-update/save-or-update.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, OrganizationRoutingModule],
  entryComponents: [
    SaveOrUpdateComponent,
    DetailComponent
  ],

  declarations: [ListComponent, SaveOrUpdateComponent, DetailComponent]
})
export class OrganizationModule { }
