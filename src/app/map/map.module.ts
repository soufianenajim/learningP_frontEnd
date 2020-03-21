import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { GoogleComponent } from './google/google.component';
import {RouterModule} from "@angular/router";
import {MapRoutes} from "./map.routing";
import {SharedModule} from "../shared/shared.module";
import { VectorComponent } from './vector/vector.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MapRoutes),
    SharedModule
  ],
  declarations: [MapComponent, GoogleComponent, VectorComponent]
})
export class MapModule { }
