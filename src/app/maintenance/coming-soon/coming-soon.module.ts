import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import { ComingSoonComponent } from './coming-soon.component';
import {ComingSoonRoutes} from "./coming-soon.routing";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComingSoonRoutes),
    SharedModule
  ],
  declarations: [ComingSoonComponent]
})
export class ComingSoonModule { }
