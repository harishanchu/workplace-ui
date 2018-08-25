import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  private navItemList;
  private menuMode: string;

  constructor(private authService: AuthService) {
    this.navItemList = [
      {title: 'Time Sheets', url: '/time-sheets', icon: 'av_timer'},
      {title: 'Tasks', url: '/tasks', icon: 'assignment_turned_in'},
      {title: 'Dashboard', url: '/dashboard', icon: 'dashboard'}
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
