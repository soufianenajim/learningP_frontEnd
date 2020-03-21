import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {RegistrationRoutes} from "./registration.routing";
import { WithSocialHeaderFooterComponent } from './with-social-header-footer/with-social-header-footer.component';
import { WithBgImageComponent } from './with-bg-image/with-bg-image.component';
import { WithHeaderFooterComponent } from './with-header-footer/with-header-footer.component';
import { WithSocialComponent } from './with-social/with-social.component';
import { MultiStepComponent } from './multi-step/multi-step.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RegistrationRoutes),
    SharedModule
  ],
  declarations: [WithSocialHeaderFooterComponent, WithBgImageComponent, WithHeaderFooterComponent, WithSocialComponent, MultiStepComponent]
})
export class RegistrationModule { }

