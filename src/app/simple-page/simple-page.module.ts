import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import { SimplePageComponent } from './simple-page.component';
import {SimplePageRoutes} from "./simple-page.routing";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SimplePageRoutes),
    SharedModule
  ],
  declarations: [SimplePageComponent]
})
export class SimplePageModule { }
