import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-configuration',
  templateUrl: './admin-configuration.component.html',
  styleUrls: ['./admin-configuration.component.scss']
})
export class AdminConfigurationComponent implements OnInit {
  private title = "Configuration";

  constructor() { }

  ngOnInit() {
  }

}
