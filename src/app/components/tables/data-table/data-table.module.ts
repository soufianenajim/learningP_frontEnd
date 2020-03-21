import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic/basic.component';
import { DataTableComponent } from './data-table.component';
import {RouterModule} from "@angular/router";
import {DataTableRoutes} from "./data-table.routing";
import {SharedModule} from "../../../shared/shared.module";
import { InlineEditComponent } from './inline-edit/inline-edit.component';
import { ChildRowComponent } from './child-row/child-row.component';
import { PagingComponent } from './paging/paging.component';
import { SelectionComponent } from './selection/selection.component';
import { CellComponent } from './selection/cell/cell.component';
import { SingleRowComponent } from './selection/single-row/single-row.component';
import { MultiRowsComponent } from './selection/multi-rows/multi-rows.component';
import { CheckboxComponent } from './selection/checkbox/checkbox.component';
import { OtherComponent } from './other/other.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DataTableRoutes),
    SharedModule
  ],
  declarations: [DataTableComponent, BasicComponent, InlineEditComponent, ChildRowComponent, PagingComponent, SelectionComponent, CellComponent, SingleRowComponent, MultiRowsComponent, CheckboxComponent, OtherComponent]
})
export class DataTableModule { }
