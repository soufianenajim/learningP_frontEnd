import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  template: '<router-outlet><spinner></spinner></router-outlet>'
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
