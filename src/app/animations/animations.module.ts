import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnimationsComponent} from "./animations.component";
import {RouterModule} from "@angular/router";
import {AnimationsRoutes} from "./animations.routing";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AnimationsRoutes),
    SharedModule
  ],
  declarations: [AnimationsComponent]
})
export class AnimationsModule { }
