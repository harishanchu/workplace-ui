import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: '../side-nav/side-nav.component.html',
  styleUrls: ['../side-nav/side-nav.component.scss']
})
export class AdminSideNavComponent implements OnInit {
  public navItemList;
  public menuMode: string;

  constructor(private authService: AuthService) {
    this.navItemList = [
      // {title: 'Dashboard', url: '/admin/dashboard', icon: 'dashboard'},
      {title: 'Time Sheets', url: '/admin/time-sheets', icon: 'av_timer'},
      {title: 'Clients & Projects', url: '/admin/clients-and-projects', icon: 'business'},
      {title: 'Employees', url: '/admin/employees', icon: 'people'}
    ];
    this.menuMode = this.authService.getUserPreference('menuMode') || 'full';
  }

  ngOnInit() {
  }

  toggleSideMenuMode() {
    if (this.menuMode === 'full') {
      this.menuMode = 'micro';
    } else {
      this.menuMode = 'full';
    }

    this.authService.setUserPreference('menuMode', this.menuMode);
  }
}
