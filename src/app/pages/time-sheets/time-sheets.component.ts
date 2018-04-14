import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';

import {TimeSheetEntryComponent} from './components/time-sheet-entry/time-sheet-entry.component';

@Component({
  selector: 'app-time-sheets',
  templateUrl: './time-sheets.component.html',
  styleUrls: ['./time-sheets.component.scss']
})
export class TimeSheetsComponent implements OnInit {
  private title: string;
  @ViewChild('timeSheetGrid') private grid;

  constructor(public dialog: MatDialog) {
    this.title = 'Time Sheets';
  }

  ngOnInit() {
  }

  addNewEntry() {
    const dialogRef = this.dialog.open(TimeSheetEntryComponent, {
      data: {
        title: 'Add new time sheet entry'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.refreshTable();
      }
    });
  }



  editEntry() {
    const dialogRef = this.dialog.open(TimeSheetEntryComponent, {
      data: {title: 'Edit time sheet entry'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.refreshTable();
      }
    });
  }

  deleteEntry() {
  }
}
