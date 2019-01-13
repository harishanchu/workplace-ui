import {Component, OnInit} from '@angular/core';
import {Globals} from '../../globals';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {Profile} from '../../models/Profile';

@Component({
  selector: 'app-admin-main-toolbar',
  templateUrl: './admin-main-toolbar.component.html',
  styleUrls: ['../main-toolbar/main-toolbar.component.scss']
})
export class AdminMainToolbarComponent implements OnInit {
  public user: Profile;

  constructor(public globals: Globals, public authService: AuthService, private router: Router,
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
    this.router.navigate(['']);
  }

}
