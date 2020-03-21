import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import { ChangeLogComponent } from './change-log.component';
import {ChangeLogRoutes} from "./change-log.routing";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ChangeLogRoutes),
    SharedModule
  ],
  declarations: [ChangeLogComponent]
})
export class ChangeLogModule { }