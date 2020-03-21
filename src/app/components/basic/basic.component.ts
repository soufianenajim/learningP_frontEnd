import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic',
  template: '<router-outlet><spinner></spinner></router-outlet>'
})
export class BasicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
