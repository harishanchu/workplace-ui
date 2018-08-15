import {AfterViewInit, Component, EventEmitter, ViewChild} from '@angular/core';
import {TimeSheetService} from '../../../../../services/time-sheet.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TimeSheet} from '../../../../../models/time-sheet';
import {SelectionModel} from '@angular/cdk/collections';

import {merge, of as observableOf} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Util} from '../../../../../helpers/util';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-admin-time-sheet-grid',
  templateUrl: '../../../../time-sheets/components/time-sheet-grid/time-sheet-grid.component.html',
  styleUrls: ['../../../../time-sheets/components/time-sheet-grid/time-sheet-grid.component.scss']
})
export class AdminTimeSheetGridComponent implements AfterViewInit {
  @ViewChild('infoPanel') private infoPanel;
  static filterableFields = {
    'employee': 'user.name',
    'status': 'status',
    'description': 'task.description',
    'comment': 'comment',
    'duration': 'duration'
  };
  static filterOpertors = ['!=', '=', '>', '<'];
  public dataSource = new MatTableDataSource();
  public selection = new SelectionModel<TimeSheet>(true, []);
  public loading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private enableRowSelection = false;
  private displayedColumns = ['user', 'client', 'project', 'description', 'type', 'comment', 'status', 'duration'];
  private displayedColumnsProperties = {
    user: {
      title: 'Employee',
      sortable: true,
      sortField: 'user.name'
    },
    client: {
      sortable: true,
      sortField: 'task.project.client.name'
    },
    project: {
      sortable: true,
      sortField: 'task.project.name'
    },
    description: {
      sortable: true,
      sortField: 'task.description'
    },
    type: {
      sortable: true,
      sortField: 'task.type'
    },
    duration: {
      title: 'Duration(hrs)',
      formatter: Util.formatTimeDuration,
      sortable: true
    },
    status: {
      formatter: function (value: string) {
        if (value === 'inProgress') {
          value = 'In progress';
        } else {
          value = 'Completed';
        }

        return value;
      },
      sortable: true
    },
    comment: {
      sortable: true
    }
  };
  private defaultSort = 'status';
  private refreshGrid = new EventEmitter();
  private enablePagination = true;
  private advancedFilter = true;
  private totalCount = 0;
  private filterValue: any;
  private filters: any = {};
  private filterErrorMessages = {
    'operator': 'Provided operator is not supported.',
    'key': 'Provided filter key is not supported',
    'error': 'Please provide a valid filter'
  };
  private advancedFilterTooltip;
  @ViewChild('table') private table;

  constructor(private timeSheetService: TimeSheetService) {
    this.advancedFilterTooltip = 'Supports filtering of fileds: ' + Object.keys(AdminTimeSheetGridComponent.filterableFields).join(', ') + ' with operators: ' + AdminTimeSheetGridComponent.filterOpertors.join(', ');
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.refreshGrid)
      .pipe(
        switchMap(() => {
          this.loading = true;
          return this.timeSheetService.getAllUserTimeSheets(this.filters, true,
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

  applyLocalFilter(filterValue: string) {
    this.filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  filterValidator(control: FormControl) {
    const bits = control.value.match(/^\s*([a-z]+?)\s*([!=><]+)\s*([a-z0-9A-Z* ]+)$/);

    if (!bits) {
      return {
        'error': true
      };
    } else if (AdminTimeSheetGridComponent.filterOpertors.indexOf(bits[2]) === -1) {
      return {
        'operator': true
      }
    } else if (Object.keys(AdminTimeSheetGridComponent.filterableFields).indexOf(bits[1]) === -1) {
      return {
        'key': true
      }
    }

    return null;
  }

  advancedFilterChange() {
    if (this.filterValue && this.filterValue.length) {
      this.filters.advancedFilters = {
        items: this.filterValue,
        filterOpertors: AdminTimeSheetGridComponent.filterOpertors,
        filterableFields: AdminTimeSheetGridComponent.filterableFields
      };
    } else {
      delete this.filters.advancedFilters;
    }

    this.loadTimeSheet(this.filters);
  }

  loadTimeSheet(filters) {
    filters.advancedFilters = this.filters.advancedFilters;
    this.filters = filters;
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
    return this.timeSheetService.downloadAllUserTimeSheets(this.filters, true,
      this.sort.active, this.sort.direction);
  }

  toggleInfoPanel () {
    this.infoPanel.toggle();
  }

  infoPanelToggleButtonText () {
    return this.infoPanel.opened? "Hide info panel": "Show info pannel";
  }
}
