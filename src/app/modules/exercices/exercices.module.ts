import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercicesRoutingModule } from './exercices-routing.module';
import { ListComponent } from './list/list.component';
import { SaveOrUpdateComponent } from './save-or-update/save-or-update.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../../shared/shared.module';
import { PersonalizeComponent } from './personalize/personalize.component';
import { EditQuestionComponent } from './personalize/edit-question/edit-question.component';
import { ShowComponent } from './show/show.component';

@NgModule({
  imports: [
    CommonModule,
    ExercicesRoutingModule,
    SharedModule,
    
  ],
  declarations: [ListComponent, SaveOrUpdateComponent, DetailComponent, PersonalizeComponent, EditQuestionComponent, ShowComponent],
  entryComponents: [SaveOrUpdateComponent,DetailComponent,PersonalizeComponent,EditQuestionComponent] ,
  exports: [PersonalizeComponent]
})
export class ExercicesModule { }
