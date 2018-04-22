import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: '../side-nav/side-nav.component.html',
  styleUrls: ['../side-nav/side-nav.component.scss']
})
export class AdminSideNavComponent implements OnInit {
  private navItemList;
  private menuMode: string;

  constructor() {
    this.navItemList = [
      {title: 'Insights', url: '/admin/insights', icon: 'dashboard'},
      {title: 'Time Sheets', url: '/admin/time-sheets', icon: 'av_timer'},
      {title: 'Employees', url: '/admin/employees', icon: 'people'},
      {title: 'Clients', url: '/admin/clients', icon: 'group_work'},
      {title: 'Projects', url: '/admin/projects', icon: 'list'}
    ];
    this.menuMode = 'full';
  }

  ngOnInit() {
  }

  toggleSideMenuMode() {
    if (this.menuMode === 'full') {
      this.menuMode = 'micro';
    } else {
      this.menuMode = 'full';
    }
  }
}
