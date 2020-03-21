import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
import { BasicElementsComponent } from './basic-elements/basic-elements.component';
import { AddOnComponent } from './add-on/add-on.component';
import { AdvanceElementsComponent } from './advance-elements/advance-elements.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import {RouterModule} from "@angular/router";
import {FormsRoutes} from "./forms.routing";
import { PickerComponent } from './picker/picker.component';
import { SelectComponent } from './select/select.component';
import { MaskingComponent } from './masking/masking.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FormsRoutes),
    SharedModule
  ],
  declarations: [FormsComponent, BasicElementsComponent, AddOnComponent, AdvanceElementsComponent, FormValidationComponent, PickerComponent, SelectComponent, MaskingComponent]
})
export class FormsModule { }