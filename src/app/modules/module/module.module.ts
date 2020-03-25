import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  imports: [
    CommonModule,
    ModuleRoutingModule
  ],
  declarations: [ListComponent]
})
export class ModuleModule { }
