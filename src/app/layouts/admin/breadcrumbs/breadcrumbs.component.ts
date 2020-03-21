import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {
  breadcrumbs: Array<Object>;
  constructor(private router:Router, private route:ActivatedRoute, private titleService: Title) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {  // note, we don't use event
        this.breadcrumbs = [];
        let currentRoute = this.route.root,
            url = '';
        do {
          let childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(route => {
            if(route.outlet === 'primary') {
              let routeSnapshot = route.snapshot;
              url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
              if (route.snapshot.data.breadcrumb != undefined) {
                let status = true;
                if (route.snapshot.data.status != undefined) {
                  status = route.snapshot.data.status;
                }

                this.breadcrumbs.push({
                  label: route.snapshot.data.breadcrumb,
                  status: status,
                  url: url
                });

                //this.titleService.setTitle( 'Mash Able | ' + route.snapshot.data.breadcrumb );

              }
              currentRoute = route;
            }
          })
        } while(currentRoute);
      })
  }
}
