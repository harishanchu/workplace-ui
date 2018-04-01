import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TimeSheetsComponent} from './pages/time-sheets/time-sheets.component';
import {DsashboardComponent} from './pages/dsashboard/dsashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'time-sheets', pathMatch: 'full' },
  { path: 'time-sheets', component: TimeSheetsComponent},
  { path: 'dashboard', component: DsashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
