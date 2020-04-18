import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponentComponent } from './auth-component/auth-component.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AuthComponentComponent,
        data: {
          breadcrumb: 'Login'
        }
      }, {
        path: 'forgot',
        component: ForgotComponent,
        data: {
          breadcrumb: 'Forgot'
        }
      }, {
      path: 'lock-screen',
      component: LockScreenComponent,
        data: {
          breadcrumb: 'Lock Screen'
        }
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
