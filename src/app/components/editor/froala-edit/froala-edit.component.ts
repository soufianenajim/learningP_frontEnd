import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-froala-edit',
  templateUrl: './froala-edit.component.html',
  styleUrls: [
    './froala-edit.component.css',
    '../../../../../node_modules/froala-editor/css/themes/dark.min.css',
    '../../../../../node_modules/froala-editor/css/themes/red.min.css',
    '../../../../../node_modules/froala-editor/css/themes/gray.min.css',
    '../../../../../node_modules/froala-editor/css/themes/royal.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class FroalaEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
