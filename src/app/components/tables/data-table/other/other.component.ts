import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";

  constructor(public http: Http) { }

  ngOnInit() {
    this.http.get(`assets/data/data.json`)
      .subscribe((data)=> {
        this.data = data.json();
      });
  }
}
