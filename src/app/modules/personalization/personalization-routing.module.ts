import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
export const routes: Routes = [{
  path: '',
  component: EditComponent,
  data: {
    breadcrumb: "Personalization"
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalizationRoutingModule { }
