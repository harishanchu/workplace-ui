import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material';

import {TimeSheetEntryComponent} from '../time-sheet-entry/time-sheet-entry.component';

@Component({
  selector: 'app-time-sheet-grid',
  templateUrl: './time-sheet-grid.component.html',
  styleUrls: ['./time-sheet-grid.component.scss']
})
export class TimeSheetGridComponent implements OnInit {
  displayedColumns = ['project', 'comment', 'duration', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
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

export interface Element {
  id: string;
  status: string;
  project: string;
  duration: number;
  comment: string;
  date: object;
}

const ELEMENT_DATA: Element[] = [
  {id: '1', status: 'completed', project: 'internal', duration: 30, comment: 'My work log', date: new Date()},
  {id: '2', status: 'completed', project: 'general', duration: 20, comment: 'Just another work log', date: new Date()},
  {id: '3', status: 'completed', project: 'general', duration: 20, comment: 'Just another work log', date: new Date()}
];
