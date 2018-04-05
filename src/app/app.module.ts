import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {MaterialModule} from './material.module';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {MainToolbarModule} from './components/main-toolbar/main-toolbar.module';
import {TimeSheetsComponent} from './pages/time-sheets/time-sheets.component';
import {DsashboardComponent} from './pages/dsashboard/dsashboard.component';
import {TimeSheetEntryComponent} from './pages/time-sheets/components/time-sheet-entry/time-sheet-entry.component';
import { TimeSheetGridComponent } from './pages/time-sheets/components/time-sheet-grid/time-sheet-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TimeSheetsComponent,
    DsashboardComponent,
    TimeSheetEntryComponent,
    TimeSheetGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    MainToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [],
  entryComponents: [
    TimeSheetEntryComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
