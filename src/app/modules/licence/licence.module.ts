import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenceRoutingModule } from './licence-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    LicenceRoutingModule
  ],
  declarations: [ListComponent]
})
export class LicenceModule { }
