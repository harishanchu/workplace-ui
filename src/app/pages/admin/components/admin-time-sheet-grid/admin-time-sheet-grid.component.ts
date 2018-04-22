import {Component, OnInit, ViewChild} from '@angular/core';
import {TimeSheetService} from '../../../../services/time-sheet.service';
import {MatTableDataSource} from '@angular/material';
import {TimeSheet} from '../../../../models/time-sheet';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-admin-time-sheet-grid',
  templateUrl: '../../../time-sheets/components/time-sheet-grid/time-sheet-grid.component.html',
  styleUrls: ['../../../time-sheets/components/time-sheet-grid/time-sheet-grid.component.scss']
})
export class AdminTimeSheetGridComponent implements OnInit {
  private displayedColumns = ['select', 'user', 'client', 'project', 'comment', 'status', 'duration'];
  private displayedColumnsTitles = {'user': 'Employee'};
  public dataSource = new MatTableDataSource();
  public selection = new SelectionModel<TimeSheet>(true, []);
  public loading = false;
  private fromDate: Date;
  private toDate: Date;
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

  loadTimeSheetForSelectedDate(fromDate: Date, toDate: Date) {
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.loading = true;
    this.timeSheetService.getAllUserTimeSheets(fromDate, toDate, true)
      .subscribe(timeSheets => {
          this.dataSource.data = timeSheets;
        },
        err => {
        },
        () => {
          this.loading = false;
        });
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
}
