import { Routes } from '@angular/router';
import {SimplePageComponent} from "./simple-page.component";

export const SimplePageRoutes: Routes = [{
    path: '',
    component: SimplePageComponent,
    data: {
        breadcrumb: "Blank Page"
    }
}];
