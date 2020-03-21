import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
declare var $: any;

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  public data: any;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';

  constructor(public http: Http) { }

  ngOnInit() {
    this.http.get(`assets/data/issue-list.json`)
        .subscribe((data) => {
          this.data = data.json();
        });

      let progression1 = 0;
      const progress = setInterval(() => {
          $('.progress .issue-text1').text(progression1 + '%');
          $('.progress .issue-text1').css({ 'left': progression1 + '%' });
          $('.progress .issue-text1').css({ 'top': '-20px' });
          $('.progress .issue-bar1').css({ 'width': progression1 + '%' });
          if (progression1 === 70) {
              clearInterval(progress);
          } else {
              progression1 += 1;
          }

      }, 100);
      setTimeout(() => {
          $('.pie-chart').sparkline([1, 1, 1], {
              type: 'pie',
              width: '150px',
              height: '150px',
              sliceColors: ['#3366CC', '#DC3912', '#FF9900'],
              tooltipClassname: 'chart-sparkline'
          });
          $('.pie-chart1').sparkline([5, 1, 3], {
              type: 'pie',
              width: '150px',
              height: '150px',
              sliceColors: ['#3366CC', '#DC3912', '#FF9900'],
              tooltipClassname: 'chart-sparkline'
          });
      }, 1);
  }

}
