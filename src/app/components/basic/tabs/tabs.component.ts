import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fadeInOutTranslate} from "../../../shared/elements/animation";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  animations: [fadeInOutTranslate]
})
export class TabsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
