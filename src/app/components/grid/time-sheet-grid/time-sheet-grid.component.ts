import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

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

  constructor() {
  }

  ngOnInit() {
  }

  editEntry() {
  }

  deleteEntry() {
  }
}

export interface Element {
  id: string,
  status: string;
  project: string;
  duration: number;
  comment: string;
  date: object;
}

const ELEMENT_DATA: Element[] = [
  /*{id: '1', status: 'completed', project: 'internal', duration: 30, comment: 'My work log', date: new Date()},
  {id: '2', status: 'completed', project: 'general', duration: 20, comment: 'Just another work log', date: new Date()},
  {id: '3', status: 'completed', project: 'general', duration: 20, comment: 'Just another work log', date: new Date()}*/
];
