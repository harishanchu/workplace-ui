import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material.module';
import {AdminMainToolbarComponent} from './admin-main-toolbar.component';
// import {AvatarModule} from 'ngx-avatar';
import {FALLBACK, GravatarConfig, GravatarModule} from 'ngx-gravatar';

const gravatarConfig: GravatarConfig = {
  fallback: FALLBACK.identicon
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    // AvatarModule
    GravatarModule.forRoot(gravatarConfig)
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
