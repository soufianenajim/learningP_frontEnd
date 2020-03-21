import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import { CrmContactComponent } from './crm-contact.component';
import {CRMContactRoutes} from "./crm-contact.routing";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CRMContactRoutes),
    SharedModule
  ],
  declarations: [CrmContactComponent]
})
export class CrmContactModule { }
