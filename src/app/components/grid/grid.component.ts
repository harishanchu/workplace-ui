import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {merge} from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements AfterViewInit {
  public enableRowSelection = true;
  @Input() enablePagination = false;
  @Input() enableFilter = false;
  public advancedFilter = false;
  // public enableGridFooter = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() public type: string;
  @Input() public displayedColumns: Array<string>;
  @Input() public displayedColumnsProperties = {};
  public defaultSort = false;
  public dataSource = new MatTableDataSource();
  @Input() public selection;
  @Input() public retrieveRecords;
  public loading = true;
  private totalCount = 0;

  constructor() {
  }

  ngAfterViewInit() {
    this.loadGrid();

    const eventsToListen: Array<any> = [this.sort.sortChange];

    if (this.enablePagination) {
      eventsToListen.push(this.paginator.page);
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    }

    merge(...eventsToListen).subscribe(() => this.loadGrid());
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
      this.dataSource.filteredData.forEach((row) => this.selection.select(row));
    }
  }

  appendItem(item) {
    this.refreshGrid();
  }

  updateItem(oldValue, updatedValue) {
    this.refreshGrid();
  }

  refreshGrid() {
    this.selection.clear();
    this.loadGrid();
  }

  loadGrid() {
    let options: any = {};
    this.loading = true;

    if (this.sort.active) {
      options = {
        'sort': this.sort.active,
        'sortDirection': this.sort.direction
      };
    }

    if (this.enablePagination) {
      options.pageIndex = this.paginator.pageIndex;
      options.pageSize = this.paginator.pageSize;
    }

    this.retrieveRecords(options).subscribe(data => {
      if (!this.enablePagination) {
        this.dataSource.data = data;
      } else {
        this.dataSource.data = data.items;
        this.totalCount = data.total;
      }

      this.loading = false;
    });
  }
}
