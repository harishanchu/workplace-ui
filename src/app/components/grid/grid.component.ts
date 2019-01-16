import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  public enableRowSelection = true;
  public enablePagination = false;
  public advancedFilter = false;
  // public enableGridFooter = true;
  @Input() public type: string;
  @Input() public displayedColumns: Array<string>;
  private displayedColumnsProperties = {
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
  public defaultSort = false;
  public dataSource = new MatTableDataSource();
  @Input() public selection;
  @Input() public retrieveRecords;
  public loading = false;

  constructor() {
  }

  ngOnInit() {
    this.loadGrid();
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
    this.retrieveRecords().subscribe(records => {
      this.dataSource.data = records;
    });
  }
}
