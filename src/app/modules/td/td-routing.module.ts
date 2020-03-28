import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { SaveOrUpdateComponent } from "./save-or-update/save-or-update.component";

export const routes: Routes = [
  {
    path: "",
    component: ListComponent,
    data: {
      breadcrumb: "Td"
    }
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TdRoutingModule {}
