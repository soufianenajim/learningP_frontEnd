import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html'
})
export class OtherComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public maxSize:number = 5;
  public bigTotalItems:number = 175;
  public bigCurrentPage:number = 1;
  public numPages:number = 0;

  public totalItems: number = 64;
  public currentPage: number = 4;
  public currentPager: number = 2;
  public smallNumPages: number = 1;
  public pageAdvance = 1;

  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: any): void {}


}
