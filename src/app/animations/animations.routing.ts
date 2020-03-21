import { Routes } from '@angular/router';
import {AnimationsComponent} from "./animations.component";

export const AnimationsRoutes: Routes = [{
    path: '',
    component: AnimationsComponent,
    data: {
        heading: 'Animations',
        breadcrumb: "Animations"
    }
}];
