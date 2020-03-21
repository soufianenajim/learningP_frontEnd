import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet><spinner></spinner></router-outlet>'
})
export class AppComponent {
  constructor() {}
}