import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TimeSheetsComponent} from './pages/time-sheets/time-sheets.component';
import {DsashboardComponent} from './pages/dsashboard/dsashboard.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {AuthGuard, GuestGuard} from './guards/index';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
  {path: 'time-sheets', component: TimeSheetsComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DsashboardComponent, canActivate: [AuthGuard]},

  {path: '', redirectTo: 'time-sheets', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
