import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { ListComponent } from './list/list.component';
import { SaveOrUpdateComponent } from './save-or-update/save-or-update.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../../shared/shared.module';
import { DetailSuggestionComponent } from './detail/detail-suggestion/detail-suggestion.component';

@NgModule({
  imports: [
    CommonModule,
    QuestionRoutingModule,
    SharedModule
  ],
  entryComponents: [
    SaveOrUpdateComponent,
    DetailComponent,
    DetailSuggestionComponent
  ],
  exports:[
    ListComponent
  ],
  declarations: [ListComponent, SaveOrUpdateComponent, DetailComponent, DetailSuggestionComponent]
})
export class QuestionModule { }
