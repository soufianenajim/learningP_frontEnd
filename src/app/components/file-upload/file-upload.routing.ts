import { Routes } from '@angular/router';
import {FileUploadComponent} from "./file-upload.component";

export const FileUploadRoutes: Routes = [{
    path: '',
    component: FileUploadComponent,
    data: {
        breadcrumb: "File Upload"
    }
}];
