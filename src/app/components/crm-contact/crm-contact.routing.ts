import { Routes } from '@angular/router';
import {CrmContactComponent} from "./crm-contact.component";


export const CRMContactRoutes: Routes = [{
    path: '',
    component: CrmContactComponent,
    data: {
        breadcrumb: "CRM Contact"
    }
}];
