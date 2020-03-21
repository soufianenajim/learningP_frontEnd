import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { CardComponent } from './card/card.component';
import {RouterModule} from "@angular/router";
import {UserRoutes} from "./user.routing";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    SharedModule
  ],
  declarations: [UserComponent, ProfileComponent, CardComponent]
})
export class UserModule { }
