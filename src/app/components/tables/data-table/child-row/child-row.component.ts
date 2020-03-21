import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-child-row',
  templateUrl: './child-row.component.html',
  styleUrls: ['./child-row.component.css']
})
export class ChildRowComponent implements OnInit {
  @ViewChild('myTable') table: any;

  rows: any[] = [];
  expanded: any = {};
  timeout: any;

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  ngOnInit() {}

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {}

}
