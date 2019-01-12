import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {AuthService} from './services/auth.service';
import {Globals} from './globals';
import {AppService} from './services/app.service';
import {NotificationService} from './services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private globals: Globals, private appService: AppService, private notificationService: NotificationService, private router: Router) {
    appService.getClientConfig()
      .subscribe(config => {
          Object.assign(this.globals, config);
        },
        error => {
          this.notificationService.error('Failed to load app');
          this.router.navigate(['/errors/500']);
        });
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
}
