import {Component, OnInit} from '@angular/core';
import {TimeSheetEntryComponent} from 'components/time-sheet-entry/time-sheet-entry.component';

@Component({
  selector: 'app-time-sheets',
  templateUrl: './time-sheets.component.html',
  styleUrls: ['./time-sheets.component.scss']
})
export class TimeSheetsComponent implements OnInit {
  private title: string;

  constructor(public dialog: MatDialog) {
    this.title = 'Time Sheets';
  }

  ngOnInit() {
  }

  addNew() {
    const dialogRef = this.dialog.open(TimeSheetEntryComponent, {
      data: {issue: issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }
}
