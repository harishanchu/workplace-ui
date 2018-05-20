import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {TimeSheet} from '../../../../models/time-sheet';
import {TimeSheetService} from '../../../../services/time-sheet.service';

@Component({
  selector: 'app-time-sheet-grid',
  templateUrl: './time-sheet-grid.component.html',
  styleUrls: ['./time-sheet-grid.component.scss']
})
export class TimeSheetGridComponent implements OnInit {
  private displayedColumns = ['select', 'client', 'project', 'comment', 'status', 'duration'];
  private displayedColumnsTitles = {};
  private defaultSort = 'status';
  private dataSource = new MatTableDataSource();
  private selection = new SelectionModel<TimeSheet>(true, []);
  private loading = false;
  private date;
  @ViewChild('table') private table;

  constructor(private timeSheetService: TimeSheetService) {
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
    this.date = date;
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

  appendItem(item) {
    this.refreshGrid();
  }

  updateItem(oldValue, updatedValue) {
    this.refreshGrid();
  }

  refreshGrid() {
    this.selection.clear();
    this.loadTimeSheetForSelectedDate(this.date);
  }
}
