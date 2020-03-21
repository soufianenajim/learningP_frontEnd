import { Routes } from '@angular/router';
import {OfflineUiComponent} from "./offline-ui.component";

export const OfflineUIRoutes: Routes = [{
    path: '',
    component: OfflineUiComponent,
    data: {
        breadcrumb: "Offline UI"
    }
}];