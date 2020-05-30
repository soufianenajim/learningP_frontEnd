import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalizationRoutingModule } from './personalization-routing.module';
import { EditComponent } from './edit/edit.component';
import { OrganizationModule } from '../organization/organization.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PersonalizationRoutingModule,
    OrganizationModule,
    SharedModule
  ],
  declarations: [EditComponent]
})
export class PersonalizationModule { }
