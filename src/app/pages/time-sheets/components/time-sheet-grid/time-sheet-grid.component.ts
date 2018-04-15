import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

import {TimeSheetEntryComponent} from '../time-sheet-entry/time-sheet-entry.component';
import {TimeSheet} from '../../../../models/time-sheet';
import {TimeSheetService} from '../../../../services/time-sheet.service';

@Component({
  selector: 'app-time-sheet-grid',
  templateUrl: './time-sheet-grid.component.html',
  styleUrls: ['./time-sheet-grid.component.scss']
})
export class TimeSheetGridComponent implements OnInit {
  private displayedColumns = ['select', 'client', 'project', 'comment', 'status', 'duration'];
  private dataSource = new MatTableDataSource();
  private selection = new SelectionModel<TimeSheet>(true, []);
  private loading = false;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private timeSheetService: TimeSheetService) {
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
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach((row: TimeSheet) => this.selection.select(row));
    }
  }


  loadTimeSheetForSelectedDate(date: Date) {
    this.loading = true;
    this.timeSheetService.getCurrentUserTimeSheets(date, true)
      .subscribe(timeSheets => {
          this.dataSource.data = timeSheets;
        },
        err => {
        },
        () => {
          this.loading = false;
        });
  }
}
