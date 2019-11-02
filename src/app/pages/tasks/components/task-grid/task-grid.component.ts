import {AfterViewInit, Component, EventEmitter, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Task} from '../../../../models/task';
import {SelectionModel} from '@angular/cdk/collections';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {TaskService} from '../../../../services/task.service';
import {NotificationService} from '../../../../services/notification.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.scss']
})
export class TaskGridComponent implements AfterViewInit {
  static filterableFields = {
    'description': 'description',
    'type': 'type',
    'client': 'project.client.name',
    'project': 'project.name'
  };
  static filterOpertors = ['!=', '=', '>', '<'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public enableRowSelection = true;
  public enableGridFooter = true;
  public displayedColumns = ['select', 'description', 'type', 'client', 'project', 'status'];
  public dataSource = new MatTableDataSource();
  public loading = true;
  public enablePagination = true;
  public filterValue: any;
  public advancedFilterTooltip;
  public filterErrorMessages = {};
  private displayedColumnsProperties = {
    description: {
      sortable: true
    },
    type: {
      sortable: true
    },
    client: {
      sortable: true,
      sortField: 'project.client.name'
    },
    project: {
      sortable: true,
      sortField: 'project.name'
    },
    status: {
      sortable: true,
      formatter: function (value: string) {
        if (value === 'open') {
          value = 'In progress';
        } else {
          value = 'Completed';
        }

        return value;
      }
    }
  };
  private selection = new SelectionModel<Task>(true, []);
  private refreshGrid = new EventEmitter();
  private totalCount = 0;
  private filters: any = {};
  @ViewChild('table') private table;

  constructor(private taskService: TaskService, private notificationService: NotificationService) {
    this.advancedFilterTooltip =
      'Supports filtering of fileds: ' +
      Object.keys(TaskGridComponent.filterableFields).join(', ') +
      ' with operators: ' + TaskGridComponent.filterOpertors.join(', ');
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.refreshGrid)
      .pipe(
        switchMap(() => {
          this.loading = true;
          this.selection.clear();
          return this.taskService.getCurrentUserTasks(
            this.filters, true,
            this.sort.active, this.sort.direction,
            this.paginator.pageIndex, this.paginator.pageSize
          ).pipe(catchError(err => {
            this.notificationService.error('Failed to load tasks grid');

            return observableOf({
              total: 0,
              items: []
            });
          }));
        }),
        map(data => {
          this.loading = false;
          this.totalCount = data.total;

          return data.items;
        })
      ).subscribe((data) => {
      this.dataSource.data = data;
    });

    this.loadGrid({});
  }

  advancedFilterChange() {
    if (this.filterValue && this.filterValue.length) {
      this.filters.advancedFilters = {
        items: this.filterValue,
        filterOpertors: TaskGridComponent.filterOpertors,
        filterableFields: TaskGridComponent.filterableFields
      };
    } else {
      delete this.filters.advancedFilters;
    }

    this.loadGrid(this.filters);
  }

  loadGrid(filters) {
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
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection.
   */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.filteredData.forEach((row: Task) => this.selection.select(row));
    }
  }

  updateItem(oldValue, updatedValue) {
    this.reloadGrid();
  }

  reloadGrid() {
    this.selection.clear();
    this.loadGrid(this.filters);
  }

  filterValidator(control: FormControl) {
  }
}
