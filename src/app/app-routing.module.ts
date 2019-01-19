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
import {AdminTimeSheetsComponent} from './pages/admin/admin-time-sheets/admin-time-sheets.component';
import {AdminDashboardComponent} from './pages/admin/admin-dashboard/admin-dashboard.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {TasksComponent} from './pages/tasks/tasks.component';
import {ServerErrorComponent} from './pages/errors/server-error/server-error.component';
import {ForgotComponent} from './pages/auth/forgot/forgot.component';
import {ResetComponent} from './pages/auth/reset/reset.component';
import {AdminEmployeesComponent} from './pages/admin/admin-employees/admin-employees.component';
import {AdminClientsAndProjectsComponent} from './pages/admin/admin-clients-and-projects/admin-clients-and-projects.component';

const routes: Routes = [
  {
    path: 'errors/500',
    component: ServerErrorComponent
  },
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'time-sheets', pathMatch: 'full'},
      {path: 'time-sheets', component: TimeSheetsComponent},
      {path: 'tasks', component: TasksComponent},
      {path: 'dashboard', component: DsashboardComponent},
      {path: 'profile', component: ProfileComponent}
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthAdminGuard],
    children: [
      {path: '', redirectTo: 'time-sheets', pathMatch: 'full'},
      {path: 'dashboard', component: AdminDashboardComponent},
      {path: 'time-sheets', component: AdminTimeSheetsComponent},
      {path: 'clients-and-projects', component: AdminClientsAndProjectsComponent},
      {path: 'employees', component: AdminEmployeesComponent}
    ]
  },
  {
    path: '',
    component: GuestLayoutComponent,
    canActivate: [GuestGuard],
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'forgot', component: ForgotComponent},
      {path: 'resetpassword/:token', component: ResetComponent},
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
