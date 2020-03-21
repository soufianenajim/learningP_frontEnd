import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ChartEvent, ChartType} from 'ng-chartist';
declare var $: any;

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class KnobComponent implements OnInit {
    options = {
        size: 300
    };

  constructor() {}
  ngOnInit() {
  }

}
