import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {TimeSheetService} from '../../../../services/time-sheet.service';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {TimeSheet} from '../../../../models/time-sheet';
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
  templateUrl: '../../../time-sheets/components/time-sheet-grid/time-sheet-grid.component.html',
  styleUrls: ['../../../time-sheets/components/time-sheet-grid/time-sheet-grid.component.scss']
})
export class AdminTimeSheetGridComponent implements AfterViewInit {
  private displayedColumns = ['select', 'user', 'client', 'project', 'comment', 'status', 'duration'];
  private displayedColumnsTitles = {'user': 'Employee'};
  public dataSource = new MatTableDataSource();
  public selection = new SelectionModel<TimeSheet>(true, []);
  public loading = false;
  private fromDate: Date;
  private toDate: Date;
  private enablePagination = true;
  @ViewChild('table') private table;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private timeSheetService: TimeSheetService) {
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.timeSheetService.getAllUserTimeSheets(this.fromDate, this.toDate, true,
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
         /* // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;*/
        }),
        catchError(() => {
         /* this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);*/
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  loadTimeSheetForSelectedDate(fromDate: Date, toDate: Date) {console.log('got here')
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.loading = true;
    /*this.timeSheetService.getAllUserTimeSheets(fromDate, toDate, true)
      .subscribe(timeSheets => {
          this.dataSource.data = timeSheets;
        },
        err => {
        },
        () => {
          this.loading = false;
        });*/
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
