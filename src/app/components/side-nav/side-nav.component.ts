import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  private navItemList;
  private menuMode: string;
  private appName: string;

  constructor() {
    this.navItemList = [
      {title: 'Time Sheets', url: '/time-sheets', icon: 'av_timer'},
      {title: 'Dashboard', url: '/dashboard', icon: 'dashboard'}
    ];
    this.menuMode = 'full';
    this.appName = 'My Deck';
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
