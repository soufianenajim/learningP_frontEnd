import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  template: '<router-outlet>\n' +
  '  <spinner></spinner>\n' +
  '</router-outlet>'
})
export class ChartsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
