import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic.component';
import { AlertComponent } from './alert/alert.component';
import {RouterModule} from "@angular/router";
import {BasicRoutes} from "./basic.routing";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import { ButtonComponent } from './button/button.component';
import { AccordionComponent } from './accordion/accordion.component';
import { GenericClassComponent } from './generic-class/generic-class.component';
import { TabsComponent } from './tabs/tabs.component';
import { TypographyComponent } from './typography/typography.component';
import { OtherComponent } from './other/other.component';
import { LabelBadgeComponent } from './label-badge/label-badge.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BasicRoutes),
    SharedModule
  ],
  declarations: [
    BasicComponent,
    AlertComponent,
    BreadcrumbComponent,
    ButtonComponent,
    AccordionComponent,
    GenericClassComponent,
    TabsComponent,
    TypographyComponent,
    OtherComponent,
    LabelBadgeComponent
  ]
})
export class BasicModule { }
