import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import {RouterModule} from "@angular/router";
import {ErrorRoutes} from "./error.routing";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ErrorRoutes),
    SharedModule
  ],
  declarations: [ErrorComponent]
})
export class ErrorModule { }
