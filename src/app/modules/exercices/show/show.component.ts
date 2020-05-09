import { Component, OnInit, Input } from '@angular/core';
import { Exercices } from '../../../core/models/exercices.model';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
@Input() exercices:Exercices;
isShow=false;
  constructor() { }

  ngOnInit() {
  }
  showDetail(){
    this.isShow=!this.isShow;
    console.log('isShow',this.isShow)
  }

}
