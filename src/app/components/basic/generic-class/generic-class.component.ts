import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fadeInOutTranslate} from "../../../shared/elements/animation";

@Component({
  selector: 'app-generic-class',
  templateUrl: './generic-class.component.html',
  animations: [fadeInOutTranslate]
})
export class GenericClassComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
