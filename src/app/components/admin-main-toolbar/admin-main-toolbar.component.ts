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

  switchUserView() {
    this.router.navigate(['']);
  }

}
