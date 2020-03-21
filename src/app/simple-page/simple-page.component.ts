import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-page',
  template: '<router-outlet><spinner></spinner></router-outlet>'
})
export class SimplePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
