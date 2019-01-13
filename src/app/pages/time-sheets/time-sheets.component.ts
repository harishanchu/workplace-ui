import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDatepickerInputEvent, MatDialog} from '@angular/material';

import {TimeSheetEntryComponent} from './components/time-sheet-entry/time-sheet-entry.component';
import {DatePipe} from '@angular/common';
import {TimeSheetService} from '../../services/time-sheet.service';
import {NotificationService} from '../../services/notification.service';
import {ConfirmComponent} from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-time-sheets',
  templateUrl: './time-sheets.component.html',
  styleUrls: ['./time-sheets.component.scss']
})
export class TimeSheetsComponent implements OnInit {
  public title: string;
  @ViewChild('timeSheetGrid') public grid;
  @Input('date') public date: Date = new Date();
  public maxDate: Date = new Date();

  constructor(public dialog: MatDialog, private datePipe: DatePipe,
              private timeSheetService: TimeSheetService,
              private notificationService: NotificationService) {
    this.title = 'Time Sheets';
  }

  ngOnInit() {
    this.grid.loadTimeSheetForSelectedDate(this.date);
  }

  addNewEntry() {
    const dialogRef = this.dialog.open(TimeSheetEntryComponent, {
      data: {
        title: 'Add new time sheet entry',
        date: this.date,
        type: 'new',
        gridCmp: this.grid
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


  editEntry(timeSheet) {
    const dialogRef = this.dialog.open(TimeSheetEntryComponent, {
      data: {
        title: 'Edit time sheet entry',
        formData: timeSheet,
        type: 'update',
        gridCmp: this.grid
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

  deleteEntry(timeSheets) {
    if (timeSheets.length > 1) {
      this.confirmDeleteEntry(confirm => {
        if (confirm) {
          this.doDeleteEntry(timeSheets);
        }
      });
    } else {
      this.doDeleteEntry(timeSheets);
    }
  }

  confirmDeleteEntry(callback) {
    this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Delete timesheet entry',
        message: 'Do you wish to delete multiple timesheets at once?'
      }
    }).afterClosed().subscribe(callback);
  }

  doDeleteEntry(timeSheets) {
    this.timeSheetService.deleteTimeSheet(timeSheets).subscribe(
      data => {
        this.grid.refreshGrid();
      },
      error => {
        this.notificationService.error(error.error.error.message);
      }
    );
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
