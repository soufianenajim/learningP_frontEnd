import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masking',
  templateUrl: './masking.component.html',
  styleUrls: ['./masking.component.css']
})
export class MaskingComponent implements OnInit {

  public value: string = '';
  public value1: string = '';
  public value2: string = '';
  public value3: string = '';
  public value4: string = '';
  public value5: string = '';

  constructor() { }

  ngOnInit() {
  }

}
