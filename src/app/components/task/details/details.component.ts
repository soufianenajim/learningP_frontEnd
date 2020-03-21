import {Component, OnInit, ElementRef} from '@angular/core';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public future: Date;
  public futureString: string = 'January 1, 2019 12:00:00';
  public diff: number;
  public $counter: Observable<number>;
  public subscription: Subscription;
  public message: string;

  constructor() {}

  ngOnInit() {
    this.future = new Date(this.futureString);
    this.$counter = Observable.interval(1000).map((x) => {
      this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
      return x;
    });

    this.subscription = this.$counter.subscribe((x) => this.message = this.dhms(this.diff));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  dhms(t) {
    let years = 0;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    days = Math.floor(t / 86400);
    if (days > 365) {
      years = Math.floor(days/365);
      days = days - (years*365);
    }
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
      years + ' years',
      days + ' days',
      hours + ' hours',
      minutes + ' min',
      seconds + ' sec'
    ].join(' ');
  }

}
