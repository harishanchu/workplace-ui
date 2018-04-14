import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

import {TimeSheetEntryComponent} from '../time-sheet-entry/time-sheet-entry.component';

@Component({
  selector: 'app-time-sheet-grid',
  templateUrl: './time-sheet-grid.component.html',
  styleUrls: ['./time-sheet-grid.component.scss']
})
export class TimeSheetGridComponent implements OnInit {
  displayedColumns = ['select', 'client', 'project', 'comment', 'duration'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Whether the number of selected elements matches the total number of rows.
   *
   * @returns {boolean}
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection.
   */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}

export interface Element {
  id: string;
  client: string;
  status: string;
  project: string;
  duration: number;
  comment: string;
  date: object;
}

const ELEMENT_DATA: Element[] = [
  {id: '1', client: 'Internal', status: 'Completed', project: 'Internal', duration: 30, comment: 'My work log', date: new Date()},
  {id: '2', client: 'Client 1', status: 'Completed', project: 'General', duration: 20, comment: 'Just another work log', date: new Date()},
  {id: '3', client: 'Client 2', status: 'Completed', project: 'General', duration: 20, comment: 'Just another work log', date: new Date()}
];
