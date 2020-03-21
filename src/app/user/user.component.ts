import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  template: '<router-outlet><spinner></spinner></router-outlet>'
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
