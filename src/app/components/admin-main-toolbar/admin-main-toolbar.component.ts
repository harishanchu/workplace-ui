import {Component, OnInit} from '@angular/core';
import {Globals} from '../../globals';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-admin-main-toolbar',
  templateUrl: './admin-main-toolbar.component.html',
  styleUrls: ['../main-toolbar/main-toolbar.component.scss']
})
export class AdminMainToolbarComponent implements OnInit {
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
        this.notificationService.error(error.error.error.message);
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
