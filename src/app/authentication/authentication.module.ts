import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutes } from './authentication.routing';
import { ForgotComponent } from './forgot/forgot.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ForgotComponent, LockScreenComponent]
})

export class AuthenticationModule {}

