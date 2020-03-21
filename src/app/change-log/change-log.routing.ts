import { Routes } from '@angular/router';
import {ChangeLogComponent} from "./change-log.component";

export const ChangeLogRoutes: Routes = [{
    path: '',
    component: ChangeLogComponent,
    data: {
        breadcrumb: "Change Log"
    }
}];
