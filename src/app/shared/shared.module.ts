import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import 'd3';
import 'nvd3';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ToggleFullscreenDirective } from './fullscreen/toggle-fullscreen.directive';
import {CardRefreshDirective} from './card/card-refresh.directive';
import {CardToggleDirective} from './card/card-toggle.directive';
import { CardComponent } from './card/card.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ParentRemoveDirective} from './elements/parent-remove.directive';
import {SqueezeBoxModule} from 'squeezebox';
import {PaginationModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpinnerComponent} from '../spinner/spinner.component';
import {ModalAnimationComponent} from './modal-animation/modal-animation.component';
import {ModalBasicComponent} from './modal-basic/modal-basic.component';
import {ScrollModule} from '../scroll/scroll.module';
import {ToastyModule} from 'ng2-toasty';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {TagInputModule} from 'ngx-chips';
import {AnimatorModule} from 'css-animator';
import {DatepickerModule} from 'angular2-material-datepicker';
import {ColorPickerModule} from 'ngx-color-picker';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {Ng2MaskModule} from 'ng2-mask';
import {SelectModule} from 'ng-select';
import {SelectOptionService} from './elements/select-option.service';
import {FormWizardModule} from 'angular2-wizard';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {QuillEditorModule} from 'ngx-quill-editor';
import {DataFilterPipe} from './elements/data-filter.pipe';
import {DataTableModule} from 'angular2-datatable';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {FileUploadModule} from 'ng2-file-upload';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {AgmCoreModule} from '@agm/core';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import {AngularEchartsModule} from 'ngx-echarts';
import {UiSwitchModule} from 'ng2-ui-switch/dist';
import {ChartModule} from 'angular2-chartjs';
import {KnobModule} from 'ng2-knob';
import {ChartistModule} from 'ng-chartist';
import {NvD3Module} from 'ng2-nvd3';

import {TodoService} from './todo/todo.service';
import {ClickOutsideModule} from 'ng-click-outside';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModule.forRoot(),
      PaginationModule.forRoot(),
      SqueezeBoxModule,
      ScrollModule,
      ToastyModule.forRoot(),
      SimpleNotificationsModule.forRoot(),
      TagInputModule,
      UiSwitchModule,
      AnimatorModule,
      DatepickerModule,
      ColorPickerModule,
      SelectModule,
      Ng2MaskModule,
      CurrencyMaskModule,
      FormWizardModule,
      NgxDatatableModule,
      DataTableModule,
      QuillEditorModule,
      FroalaEditorModule.forRoot(),
      FroalaViewModule.forRoot(),
      FileUploadModule,
      ScrollToModule.forRoot(),
      AgmCoreModule.forRoot({apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'}),
      Ng2GoogleChartsModule,
      AngularEchartsModule,
      ChartModule,
      KnobModule,
      ChartistModule,
      NvD3Module,
      ClickOutsideModule
  ],
  declarations: [
      AccordionAnchorDirective,
      AccordionLinkDirective,
      AccordionDirective,
      ToggleFullscreenDirective,
      CardRefreshDirective,
      CardToggleDirective,
      ParentRemoveDirective,
      CardComponent,
      SpinnerComponent,
      ModalAnimationComponent,
      ModalBasicComponent,
      DataFilterPipe
  ],
  exports: [
      AccordionAnchorDirective,
      AccordionLinkDirective,
      AccordionDirective,
      ToggleFullscreenDirective,
      CardRefreshDirective,
      CardToggleDirective,
      ParentRemoveDirective,
      CardComponent,
      SpinnerComponent,
      SqueezeBoxModule,
      NgbModule,
      PaginationModule,
      FormsModule,
      ReactiveFormsModule,
      ModalBasicComponent,
      ModalAnimationComponent,
      ScrollModule,
      ToastyModule,
      SimpleNotificationsModule,
      TagInputModule,
      UiSwitchModule,
      AnimatorModule,
      DatepickerModule,
      ColorPickerModule,
      SelectModule,
      Ng2MaskModule,
      CurrencyMaskModule,
      FormWizardModule,
      NgxDatatableModule,
      DataTableModule,
      DataFilterPipe,
      QuillEditorModule,
      FroalaEditorModule,
      FroalaViewModule,
      FileUploadModule,
      ScrollToModule,
      AgmCoreModule,
      Ng2GoogleChartsModule,
      AngularEchartsModule,
      ChartModule,
      KnobModule,
      ChartistModule,
      NvD3Module,
      ClickOutsideModule
  ],
  providers: [
      MenuItems,
      TodoService,
      SelectOptionService
  ]
})
export class SharedModule { }
