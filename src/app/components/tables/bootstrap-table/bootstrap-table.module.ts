import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';

import {BootstrapTableRoutes} from "./bootstrap-table.routing";
import { BootstrapTableComponent } from './bootstrap-table.component';
import { BasicComponent } from './basic/basic.component';
import { SizingComponent } from './sizing/sizing.component';
import { BorderComponent } from './border/border.component';
import { StylingComponent } from './styling/styling.component';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BootstrapTableRoutes),
    SharedModule
  ],
  declarations: [BootstrapTableComponent, BasicComponent, SizingComponent, BorderComponent, StylingComponent]
})
export class BootstrapTableModule { }
