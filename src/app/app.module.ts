import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import './rxjs-operators';
import {ChartistModule} from 'ng-chartist';
import { TagInputModule } from 'ngx-chips';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AuthGuard, GuestGuard} from './guards/index';
import {AppHttpInterceptor} from './helpers/app-http.interceptor';
import {AuthService} from './services/auth.service';
import {Globals} from './globals';

import {MaterialModule} from './material.module';
import {MainToolbarModule} from './components/main-toolbar/main-toolbar.module';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {TimeSheetsComponent} from './pages/time-sheets/time-sheets.component';
import {DsashboardComponent} from './pages/dsashboard/dsashboard.component';
import {TimeSheetEntryComponent} from './pages/time-sheets/components/time-sheet-entry/time-sheet-entry.component';
import {TimeSheetGridComponent} from './pages/time-sheets/components/time-sheet-grid/time-sheet-grid.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {NotificationService} from './services/notification.service';
import {HomeLayoutComponent} from './layouts/home-layout/home-layout.component';
import {GuestLayoutComponent} from './layouts/guest-layout/guest-layout.component';
import {TimeSheetService} from './services/time-sheet.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter} from '@angular/material';
import {DatePipe} from '@angular/common';
import {AppService} from './services/app.service';
import {OpenTasksListComponent} from './pages/time-sheets/components/open-tasks-list/open-tasks-list.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AdminSideNavComponent} from './components/admin-side-nav/admin-side-nav.component';
import {AuthAdminGuard} from './guards/auth-admin.guard';
import {AdminMainToolbarModule} from './components/admin-main-toolbar/admin-main-toolbar.module';
import {AdminTimeSheetsComponent} from './pages/admin/admin-time-sheets/admin-time-sheets.component';
import {AdminTimeSheetGridComponent} from './pages/admin/admin-time-sheets/components/admin-time-sheet-grid/admin-time-sheet-grid.component';
import {AdminDashboardComponent} from './pages/admin/admin-dashboard/admin-dashboard.component';
import {AdminConfigurationComponent} from './pages/admin/admin-configuration/admin-configuration.component';
import {ClientsGridComponent} from './pages/admin/admin-configuration/components/clients-grid/clients-grid.component';
import {ProjectsGridComponent} from './pages/admin/admin-configuration/components/projects-grid/projects-grid.component';
import {TasksGridComponent} from './pages/admin/admin-configuration/components/tasks-grid/tasks-grid.component';
import {EmployeesGridComponent} from './pages/admin/admin-configuration/components/employees-grid/employees-grid.component';
import {ProfileComponent} from './pages/profile/profile.component';
import { TimeSheetGridInfoComponent } from './pages/time-sheets/components/time-sheet-grid-info/time-sheet-grid-info.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TimeSheetsComponent,
    DsashboardComponent,
    TimeSheetEntryComponent,
    TimeSheetGridComponent,
    LoginComponent,
    RegisterComponent,
    HomeLayoutComponent,
    GuestLayoutComponent,
    OpenTasksListComponent,
    AdminLayoutComponent,
    AdminSideNavComponent,
    AdminTimeSheetsComponent,
    AdminTimeSheetGridComponent,
    AdminDashboardComponent,
    AdminConfigurationComponent,
    ClientsGridComponent,
    ProjectsGridComponent,
    TasksGridComponent,
    EmployeesGridComponent,
    ProfileComponent,
    TimeSheetGridInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    MainToolbarModule,
    AdminMainToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ChartistModule,
    TagInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    {
      provide: DateAdapter, useClass: NativeDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_NATIVE_DATE_FORMATS
    },
    AuthGuard,
    AuthService,
    GuestGuard,
    Globals,
    NotificationService,
    TimeSheetService,
    DatePipe,
    AppService,
    AuthAdminGuard
  ],
  entryComponents: [
    TimeSheetEntryComponent,
    OpenTasksListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
