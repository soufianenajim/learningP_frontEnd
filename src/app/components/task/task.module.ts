import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { ListComponent } from './list/list.component';
import { BoardComponent } from './board/board.component';
import { DetailsComponent } from './details/details.component';
import { IssueComponent } from './issue/issue.component';
import {RouterModule} from "@angular/router";
import {TaskRoutes} from "./task.routing";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TaskRoutes),
    SharedModule
  ],
  declarations: [TaskComponent, ListComponent, BoardComponent, DetailsComponent, IssueComponent]
})
export class TaskModule { }
