import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [
    {
      path: '',
      redirectTo: "dashboard",
      pathMatch: 'full'
    },{
      path: 'dashboard',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    }
  ]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },{
    path: 'landing',
    loadChildren: './landing/landing.module#LandingModule'
  },{
    path: 'maintenance/offline-ui',
    loadChildren: './maintenance/offline-ui/offline-ui.module#OfflineUiModule'
  },]
}, {
  path: '**',
  redirectTo: 'error/404'
}];