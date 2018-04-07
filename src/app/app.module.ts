import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import './rxjs-operators';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AuthGuard, GuestGuard} from './guards/index';
import {AuthInterceptor} from './helpers/index';
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
import { RegisterComponent } from './pages/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TimeSheetsComponent,
    DsashboardComponent,
    TimeSheetEntryComponent,
    TimeSheetGridComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    MainToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
    AuthService,
    GuestGuard,
    Globals
  ],
  entryComponents: [
    TimeSheetEntryComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
