import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvanceComponent } from './advance.component';
import {RouterModule} from "@angular/router";
import {AdvanceRoutes} from "./advance.routing";
import { ModalComponent } from './modal/modal.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotifyComponent } from './notify/notify.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdvanceRoutes),
    SharedModule
  ],
  declarations: [
      AdvanceComponent,
      ModalComponent,
      NotificationsComponent,
      NotifyComponent
  ]
})
export class AdvanceModule { }
