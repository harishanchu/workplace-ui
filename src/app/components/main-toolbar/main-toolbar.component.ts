import {Component, OnInit} from '@angular/core';
import {Globals} from '../../globals';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {
  private appName: string;

  constructor(private globals: Globals, private authService: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
