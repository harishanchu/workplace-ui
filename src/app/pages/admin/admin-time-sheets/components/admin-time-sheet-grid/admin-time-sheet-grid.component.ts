import {AfterViewInit, Component, EventEmitter, ViewChild} from '@angular/core';
import {TimeSheetService} from '../../../../../services/time-sheet.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TimeSheet} from '../../../../../models/time-sheet';
import {SelectionModel} from '@angular/cdk/collections';

import {merge, of as observableOf} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Util} from '../../../../../helpers/util';

@Component({
  selector: 'app-admin-time-sheet-grid',
  templateUrl: '../../../../time-sheets/components/time-sheet-grid/time-sheet-grid.component.html',
  styleUrls: ['../../../../time-sheets/components/time-sheet-grid/time-sheet-grid.component.scss']
})
export class AdminTimeSheetGridComponent implements AfterViewInit {
  public dataSource = new MatTableDataSource();
  public selection = new SelectionModel<TimeSheet>(true, []);
  public loading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private enableRowSelection = false;
  private displayedColumns = ['user', 'client', 'project', 'description', 'status', 'duration'];
  private displayedColumnsProperties = {
    user: {
      title: 'Employee'
    },
    duration: {
      title: 'Duration(hrs)',
      formatter: Util.formatTimeDuration
    },
    status: {
      formatter: function (value: string) {
        if (value === 'inProgress') {
          value = 'In progress';
        } else {
          value = 'Completed';
        }

        return value;
      }
    }
  };
  private defaultSort = 'status';
  private fromDate: Date;
  private toDate: Date;
  private refreshGrid = new EventEmitter();
  private enablePagination = true;
  private totalCount = 0;
  private filterValue = '';
  @ViewChild('table') private table;

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
      ).subscribe((data) => {
      this.dataSource.data = data;
    });
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

  export() {
    return this.timeSheetService.downloadAllUserTimeSheets(this.fromDate, this.toDate, true,
      this.sort.active, this.sort.direction);
  }
}
