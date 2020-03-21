import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import 'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: [
      './summary.component.css',
      '../../../../../node_modules/c3/c3.min.css'
  ],
    encapsulation: ViewEncapsulation.None
})
export class SummaryComponent implements OnInit {

  type1 = 'bar';
  data1 = {
      labels: ['jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      datasets: [{
          label: 'Sales',
          backgroundColor: [
              'rgba(95, 190, 170, 0.99)',
              'rgba(95, 190, 170, 0.99)',
              'rgba(95, 190, 170, 0.99)',
              'rgba(95, 190, 170, 0.99)',
              'rgba(95, 190, 170, 0.99)',
              'rgba(95, 190, 170, 0.99)',
              'rgba(26, 188, 156, 0.88)',
              'rgba(26, 188, 156, 0.88)',
              'rgba(95, 190, 170, 0.99)'
          ],
          hoverBackgroundColor: [
              'rgba(26, 188, 156, 0.88)',
              'rgba(26, 188, 156, 0.88)',
              'rgba(26, 188, 156, 0.88)',
              'rgba(26, 188, 156, 0.88)',
              'rgba(26, 188, 156, 0.88)',
              'rgba(26, 188, 156, 0.88)',
              'rgba(26, 188, 156, 0.88)',
              'rgba(26, 188, 156, 0.88)',
              'rgba(26, 188, 156, 0.88)'
          ],
          data: [65, 59, 80, 81, 56, 55, 50, 45],
      }, {
          label: 'Expense',
          backgroundColor: [
              'rgba(93, 156, 236, 0.93)',
              'rgba(93, 156, 236, 0.93)',
              'rgba(93, 156, 236, 0.93)',
              'rgba(93, 156, 236, 0.93)',
              'rgba(93, 156, 236, 0.93)',
              'rgba(93, 156, 236, 0.93)',
              'rgba(26, 188, 156, 0.88)',
              'rgba(26, 188, 156, 0.88)',
              'rgba(93, 156, 236, 0.93)'
          ],
          hoverBackgroundColor: [
              'rgba(103, 162, 237, 0.82)',
              'rgba(103, 162, 237, 0.82)',
              'rgba(103, 162, 237, 0.82)',
              'rgba(103, 162, 237, 0.82)',
              'rgba(103, 162, 237, 0.82)',
              'rgba(103, 162, 237, 0.82)',
              'rgba(26, 188, 156, 0.88)',
              'rgba(26, 188, 156, 0.88)',
              'rgba(103, 162, 237, 0.82)'
          ],
          data: [60, 69, 85, 91, 58, 50, 45, 45],
      }]
  };
  options = {
      responsive: true,
      maintainAspectRatio: false,
      barValueSpacing: 20
  };
  constructor() { }

  ngOnInit() {
      setTimeout(() => {
          const chart2 = c3.generate({
              bindto: '#chart2',
              data: {
                  columns: [
                      ['Current', 100],
                      ['Overdue by 15 days', 120],
                      ['Overdue by 30 days', 30],
                  ],
                  type: 'donut',
                  onclick: function(d, i) { console.log('onclick', d, i); },
                  onmouseover: function(d, i) { console.log('onmouseover', d, i); },
                  onmouseout: function(d, i) { console.log('onmouseout', d, i); }
              },
              color: {
                  pattern: ['#4CAF50', '#2196F3', '#e74c3c']
              },
              donut: {
                  title: 'Invoice Summary'
              }
          });
          const chart3 = c3.generate({
              bindto: '#chart3',
              data: {
                  // iris data from R
                  columns: [
                      ['Electricity', 40],
                      ['Internet', 20],
                      ['Assets', 120],
                      ['Party', 10],
                      ['Infrastructure', 90],
                  ],
                  type: 'pie',
                  onclick: function(d, i) { console.log('onclick', d, i); },
                  onmouseover: function(d, i) { console.log('onmouseover', d, i); },
                  onmouseout: function(d, i) { console.log('onmouseout', d, i); }
              },
              color: {
                  pattern: ['#2196F3', '#4CAF50', '#ff5252', '#f57c00', '#ccc']
              },
          });
      }, 1);
  }

}
