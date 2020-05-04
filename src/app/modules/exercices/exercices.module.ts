import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercicesRoutingModule } from './exercices-routing.module';
import { ListComponent } from './list/list.component';
import { SaveOrUpdateComponent } from './save-or-update/save-or-update.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ExercicesRoutingModule,
    SharedModule,
    
  ],
  declarations: [ListComponent, SaveOrUpdateComponent, DetailComponent],
  entryComponents: [SaveOrUpdateComponent,DetailComponent] 
})
export class ExercicesModule { }
