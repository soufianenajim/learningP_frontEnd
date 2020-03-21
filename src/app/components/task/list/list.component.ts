import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public data: any;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';

  constructor(public http: Http) {}

  ngOnInit() {
    this.http.get(`assets/data/task-list.json`)
        .subscribe((data) => {
          this.data = data.json();
        });
  }

}
