import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material.module';
import {MainToolbarComponent} from './main-toolbar.component';
// import {AvatarModule} from 'ngx-avatar';
import {FALLBACK, GravatarConfig, GravatarModule, RATING} from 'ngx-gravatar';

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
    MainToolbarComponent
  ],
  exports: [
    MainToolbarComponent
  ]
})
export class MainToolbarModule {
}
