import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDatepickerInputEvent, MatDialog} from '@angular/material';

import {TimeSheetEntryComponent} from './components/time-sheet-entry/time-sheet-entry.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-time-sheets',
  templateUrl: './time-sheets.component.html',
  styleUrls: ['./time-sheets.component.scss']
})
export class TimeSheetsComponent implements OnInit {
  private title: string;
  @ViewChild('timeSheetGrid') private grid;
  @Input('date') private date: Date = new Date();
  private maxDate: Date = new Date();

  constructor(public dialog: MatDialog, private datePipe: DatePipe) {
    this.title = 'Time Sheets';
  }

  ngOnInit() {
    this.grid.loadTimeSheetForSelectedDate(this.date);
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

  isMaximumDateReached() {
    return this.maxDate.toDateString() === this.date.toDateString();
  }

  swithDate(unit) {
    this.date.setDate(this.date.getDate() + unit);
    this.grid.loadTimeSheetForSelectedDate(this.date);
  }

  onDatePick(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
    this.grid.loadTimeSheetForSelectedDate(this.date);
  }

  formatDate() {
    return this.datePipe.transform(this.date, 'LLL dd yyyy');
  }
}
