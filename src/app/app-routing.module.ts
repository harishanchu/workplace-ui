import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TimeSheetsComponent} from './pages/time-sheets/time-sheets.component';
import {DsashboardComponent} from './pages/dsashboard/dsashboard.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {AuthGuard, GuestGuard} from './guards/index';
import {HomeLayoutComponent} from './layouts/home-layout/home-layout.component';
import {GuestLayoutComponent} from './layouts/guest-layout/guest-layout.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthAdminGuard} from './guards/auth-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'time-sheets', pathMatch: 'full'},
      {path: 'time-sheets', component: TimeSheetsComponent},
      {path: 'dashboard', component: DsashboardComponent}
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthAdminGuard],
    children: [
      {path: 'dashboard', component: DsashboardComponent}
    ]
  },
  {
    path: '',
    component: GuestLayoutComponent,
    canActivate: [GuestGuard],
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
