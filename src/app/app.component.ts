import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from './core/services/local/local.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet><spinner></spinner></router-outlet>'
})
export class AppComponent {
  constructor(translate: TranslateService, private localService: LocalService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    this.localService.registerLocale('en-US');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }
}