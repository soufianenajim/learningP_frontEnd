import {NgModule} from "@angular/core";
import {WithSocialComponent} from "./with-social/with-social.component";
import {WithHeaderFooterComponent} from "./with-header-footer/with-header-footer.component";
import {WithBgImageComponent} from "./with-bg-image/with-bg-image.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {LoginRoutes} from "./login.routing";
import { WithSocialHeaderFooterComponent } from './with-social-header-footer/with-social-header-footer.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(LoginRoutes),
        SharedModule
    ],
    declarations: [WithBgImageComponent, WithHeaderFooterComponent, WithSocialComponent, WithSocialHeaderFooterComponent]
})

export class LoginModule {}
