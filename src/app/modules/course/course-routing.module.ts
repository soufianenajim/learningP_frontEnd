import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

export const routes: Routes = [{
  path: '',
  component: ListComponent,
  data: {
    breadcrumb: "MENU_ITEM.COURSE"
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
