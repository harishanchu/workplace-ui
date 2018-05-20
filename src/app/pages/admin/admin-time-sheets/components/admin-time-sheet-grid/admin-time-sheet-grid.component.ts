import {AfterViewInit, Component, ViewChild, OnInit, EventEmitter, Output} from '@angular/core';
import {TimeSheetService} from '../../../../../services/time-sheet.service';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {TimeSheet} from '../../../../../models/time-sheet';
import {SelectionModel} from '@angular/cdk/collections';

import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';

@Component({
  selector: 'app-admin-time-sheet-grid',
  templateUrl: '../../../../time-sheets/components/time-sheet-grid/time-sheet-grid.component.html',
  styleUrls: ['../../../../time-sheets/components/time-sheet-grid/time-sheet-grid.component.scss']
})
export class AdminTimeSheetGridComponent implements AfterViewInit {
  private displayedColumns = ['select', 'user', 'client', 'project', 'comment', 'status', 'duration'];
  private displayedColumnsTitles = {'user': 'Employee'};
  private defaultSort = 'status';
  public dataSource = new MatTableDataSource();
  public selection = new SelectionModel<TimeSheet>(true, []);
  public loading = true;
  private fromDate: Date;
  private toDate: Date;
  private refreshGrid = new EventEmitter();
  private enablePagination = true;
  private totalCount = 0;
  private filterValue = '';
  @ViewChild('table') private table;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private timeSheetService: TimeSheetService) {
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.refreshGrid)
      .pipe(
        switchMap(() => {
          this.loading = true;
          return this.timeSheetService.getAllUserTimeSheets(this.fromDate, this.toDate, true,
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
          this.loading = false;
          this.totalCount = data.total;

          return data.items;
        }),
        catchError((err, caught): any => {
          this.loading = false;
          return observableOf([]);
        })
      ).subscribe((data) => {this.dataSource.data = data;});
  }

  applyFilter(filterValue: string) {
    this.filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  loadTimeSheetForSelectedDate(fromDate: Date, toDate: Date) {
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.paginator.pageIndex = 0;
    this.refreshGrid.emit();
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
