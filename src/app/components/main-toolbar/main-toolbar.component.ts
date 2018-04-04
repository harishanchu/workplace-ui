import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {
  private appName: string;

  constructor() {
    this.appName = 'My deck';
  }

  ngOnInit() {
  }

}
