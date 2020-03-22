import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css',
        '../../assets/icon/SVG-animated/svg-weather.css'
    ],
    encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
    ngOnInit() {

    }
}