import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material.module';
import {AvatarModule} from 'ngx-avatar';
import {AdminMainToolbarComponent} from './admin-main-toolbar.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    AvatarModule
  ],
  declarations: [
    AdminMainToolbarComponent
  ],
  exports: [
    AdminMainToolbarComponent
  ]
})
export class AdminMainToolbarModule {
}
