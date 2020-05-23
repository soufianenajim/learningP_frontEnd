import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ExercicesRoutingModule } from "./exercices-routing.module";
import { ListComponent } from "./list/list.component";
import { SaveOrUpdateExComponent } from "./save-or-update/save-or-update.component";
import { DetailComponent } from "./detail/detail.component";
import { SharedModule } from "../../shared/shared.module";
import { PersonalizeComponent } from "./personalize/personalize.component";
import { EditQuestionComponent } from "./personalize/edit-question/edit-question.component";
import { ShowComponent } from "./show/show.component";
import { ListQuestionComponent } from "./personalize/list-question/list-question.component";
import { DetailQuestionComponent } from "./personalize/list-question/detail/detail.component";
import {DetailSuggestionQuestionComponent}from  "./personalize/list-question/detail/detail-suggestion/detail-suggestion.component";
@NgModule({
  imports: [CommonModule, ExercicesRoutingModule, SharedModule],
  declarations: [
    ListComponent,
    SaveOrUpdateExComponent,
    DetailComponent,
    PersonalizeComponent,
    EditQuestionComponent,
    ShowComponent,
    ListQuestionComponent,
    DetailQuestionComponent,
    DetailSuggestionQuestionComponent,
  ],
  entryComponents: [
    SaveOrUpdateExComponent,
    DetailComponent,
    PersonalizeComponent,
    EditQuestionComponent,
    DetailQuestionComponent,
    DetailSuggestionQuestionComponent,
    
  ],
  exports: [PersonalizeComponent,SaveOrUpdateExComponent],
})
export class ExercicesModule {}
