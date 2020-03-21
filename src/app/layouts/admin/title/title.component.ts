import { Component } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-title',
  template: ''
})
export class TitleComponent {
  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        let currentRoute = this.route.root;
        let title = '';
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(route => {
            if (route.outlet === 'primary') {
              title = route.snapshot.data.breadcrumb;
              currentRoute = route;
            }
          })
        } while (currentRoute);
        this.titleService.setTitle( 'Mash Able | ' + title );
      });
  }
}
