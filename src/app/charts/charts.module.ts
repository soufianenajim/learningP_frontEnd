import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
import { GoogleComponent } from './google/google.component';
import {RouterModule} from '@angular/router';
import {ChartRoutes} from './charts.routing';
import {SharedModule} from '../shared/shared.module';
import { EchartComponent } from './echart/echart.component';
import { ChartJsComponent } from './chart-js/chart-js.component';
import { KnobComponent } from './knob/knob.component';
import { ListChartComponent } from './list-chart/list-chart.component';
import { MorrisJsComponent } from './morris-js/morris-js.component';
import { Nvd3Component } from './nvd3/nvd3.component';
import { PeityComponent } from './peity/peity.component';
import { RadialComponent } from './radial/radial.component';
import { SparklinesComponent } from './sparklines/sparklines.component';
import {C3JsComponent} from './c3-js/c3-js.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ChartRoutes),
    SharedModule
  ],
  declarations: [
      ChartsComponent,
      GoogleComponent,
      EchartComponent,
      ChartJsComponent,
      KnobComponent,
      ListChartComponent,
      MorrisJsComponent,
      Nvd3Component,
      PeityComponent,
      RadialComponent,
      SparklinesComponent,
      C3JsComponent
  ]
})
export class ChartsModule { }
