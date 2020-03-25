import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TdRoutingModule } from "./td-routing.module";
import { ListComponent } from "./list/list.component";
import { SaveOrUpdateComponent } from "./save-or-update/save-or-update.component";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  imports: [CommonModule, TdRoutingModule, SharedModule],
  declarations: [ListComponent, SaveOrUpdateComponent]
})
export class TdModule {}
