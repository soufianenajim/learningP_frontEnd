import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import { InvoiceComponent } from './invoice.component';
import { BasicComponent } from './basic/basic.component';
import { SummaryComponent } from './summary/summary.component';
import { ListComponent } from './list/list.component';
import {InvoiceRoutes} from "./invoice.routing";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InvoiceRoutes),
    SharedModule
  ],
  declarations: [InvoiceComponent, BasicComponent, SummaryComponent, ListComponent]
})
export class InvoiceModule { }
