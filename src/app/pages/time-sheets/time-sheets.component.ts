import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-time-sheets',
  templateUrl: './time-sheets.component.html',
  styleUrls: ['./time-sheets.component.scss']
})
export class TimeSheetsComponent implements OnInit {
  private title: string;

  constructor() {
    this.title = 'Time Sheets';
  }

  ngOnInit() {
  }

}
