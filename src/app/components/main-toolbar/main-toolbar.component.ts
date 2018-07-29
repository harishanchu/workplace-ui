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
  constructor(private globals: Globals, private authService: AuthService, private router: Router,
              private notificationService: NotificationService) {
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
    this.router.navigate(['/admin']);
  }
}
