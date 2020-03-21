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
    },{
      path: 'basic',
      loadChildren: './components/basic/basic.module#BasicModule'
    },{
      path: 'advance',
      loadChildren: './components/advance/advance.module#AdvanceModule'
    },{
      path: 'animations',
      loadChildren: './animations/animations.module#AnimationsModule'
    },{
      path: 'forms',
      loadChildren: './components/forms/forms.module#FormsModule'
    },{
      path: 'bootstrap-table',
      loadChildren: './components/tables/bootstrap-table/bootstrap-table.module#BootstrapTableModule',
    },{
      path: 'data-table',
      loadChildren: './components/tables/data-table/data-table.module#DataTableModule',
    },{
      path: 'map',
      loadChildren: './map/map.module#MapModule',
    },{
      path: 'charts',
      loadChildren: './charts/charts.module#ChartsModule',
    },{
      path: 'maintenance/error',
      loadChildren: './maintenance/error/error.module#ErrorModule'
    },{
      path: 'maintenance/coming-soon',
      loadChildren: './maintenance/coming-soon/coming-soon.module#ComingSoonModule'
    },{
      path: 'user',
      loadChildren: './user/user.module#UserModule'
    },{
      path: 'crm-contact',
      loadChildren: './components/crm-contact/crm-contact.module#CrmContactModule'
    },{
      path: 'task',
      loadChildren: './components/task/task.module#TaskModule'
    },{
      path: 'editor',
      loadChildren: './components/editor/editor.module#EditorModule'
    },{
      path: 'invoice',
      loadChildren: './components/invoice/invoice.module#InvoiceModule'
    },{
      path: 'file-upload',
      loadChildren: './components/file-upload/file-upload.module#FileUploadModule'
    },{
      path: 'change-log',
      loadChildren: './change-log/change-log.module#ChangeLogModule'
    },{
      path: 'simple-page',
      loadChildren: './simple-page/simple-page.module#SimplePageModule'
    }
  ]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },{
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
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