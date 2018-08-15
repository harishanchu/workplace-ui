import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-time-sheet-grid-info',
  templateUrl: './time-sheet-grid-info.component.html',
  styleUrls: ['./time-sheet-grid-info.component.css']
})
export class TimeSheetGridInfoComponent implements OnInit {
  @Input() selectedRecords: any;

  constructor() {
  }

  ngOnInit() {
  }

  getInfoPanelTitle() {
    let title: string;

    if (!this.selectedRecords.length) {
      title = 'Select a record';
    } else if (this.selectedRecords.length === 1) {
      title = this.selectedRecords[0].description.trim();
    } else {
      title = this.selectedRecords.length + ' timesheets selected';
    }

    return title;
  }
}
