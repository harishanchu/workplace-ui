import {Component, OnInit} from '@angular/core';
import {Globals} from '../../globals';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {
  private user: object;

  constructor(private globals: Globals, private authService: AuthService, private router: Router,
              private notificationService: NotificationService) {
    this.user = this.authService.getUserDetails();
    this.authService.profileChange$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      error => {
        this.authService.clearAuthData();
        this.router.navigate(['/login']);
      }
    );
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  switchUserView() {
    this.router.navigate(['/admin']);
  }
}
