import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material.module';
import {MainToolbarComponent} from './main-toolbar.component';
import {AvatarModule} from 'ngx-avatar';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    AvatarModule
  ],
  declarations: [
    MainToolbarComponent
  ],
  exports: [
    MainToolbarComponent
  ]
})
export class MainToolbarModule {
}
