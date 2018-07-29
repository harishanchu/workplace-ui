import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: '../side-nav/side-nav.component.html',
  styleUrls: ['../side-nav/side-nav.component.scss']
})
export class AdminSideNavComponent implements OnInit {
  private navItemList;
  private menuMode: string;

  constructor(private authService: AuthService) {
    this.navItemList = [
      {title: 'Dashboard', url: '/admin/dashboard', icon: 'dashboard'},
      {title: 'Time Sheets', url: '/admin/time-sheets', icon: 'av_timer'},
      {title: 'Configuration', url: '/admin/configuration', icon: 'settings'}
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
