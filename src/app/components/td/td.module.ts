import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TdRoutingModule } from './td-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    TdRoutingModule
  ],
  declarations: [ListComponent]
})
export class TdModule { }
