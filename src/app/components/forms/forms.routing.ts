import {Routes} from "@angular/router";
import {BasicElementsComponent} from "./basic-elements/basic-elements.component";
import {AddOnComponent} from "./add-on/add-on.component";
import {AdvanceElementsComponent} from "./advance-elements/advance-elements.component";
import {FormValidationComponent} from "./form-validation/form-validation.component";
import {PickerComponent} from "./picker/picker.component";
import {SelectComponent} from "./select/select.component";
import {MaskingComponent} from "./masking/masking.component";

export const FormsRoutes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Form Components',
            status: false
        },
        children: [
            {
                path: 'basic-elements',
                component: BasicElementsComponent,
                data: {
                    breadcrumb: 'Form Components',
                    status: true
                }
            },{
                path: 'add-on',
                component: AddOnComponent,
                data: {
                    breadcrumb: 'Form Elements Add-On',
                    status: true
                }
            },{
                path: 'advance-elements',
                component: AdvanceElementsComponent,
                data: {
                    breadcrumb: 'Form Elements Advance',
                    status: true
                }
            },{
                path: 'form-validation',
                component: FormValidationComponent,
                data: {
                    breadcrumb: 'Form Validation',
                    status: true
                }
            },{
                path: 'picker',
                component: PickerComponent,
                data: {
                    breadcrumb: 'Form Picker'
                }
            },{
                path: 'select',
                component: SelectComponent,
                data: {
                    breadcrumb: 'Form Select'
                }
            },{
                path: 'masking',
                component: MaskingComponent,
                data: {
                    breadcrumb: 'Form Masking'
                }
            }
        ]
    }
]