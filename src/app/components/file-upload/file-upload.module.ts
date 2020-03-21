import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import { FileUploadComponent } from './file-upload.component';
import {FileUploadRoutes} from "./file-upload.routing";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FileUploadRoutes),
    SharedModule
  ],
  declarations: [FileUploadComponent]
})
export class FileUploadModule { }
