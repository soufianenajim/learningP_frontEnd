import { Routes } from '@angular/router';
import {ComingSoonComponent} from "./coming-soon.component";

export const ComingSoonRoutes: Routes = [{
    path: '',
    component: ComingSoonComponent,
    data: {
        breadcrumb: "Coming Soon"
    }
}];