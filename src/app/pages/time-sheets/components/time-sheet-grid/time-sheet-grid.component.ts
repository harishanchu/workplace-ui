import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {TimeSheet} from '../../../../models/time-sheet';
import {TimeSheetService} from '../../../../services/time-sheet.service';
import {Util} from '../../../../helpers/util';

@Component({
  selector: 'app-time-sheet-grid',
  templateUrl: './time-sheet-grid.component.html',
  styleUrls: ['./time-sheet-grid.component.scss']
})
export class TimeSheetGridComponent implements OnInit {
  @ViewChild('infoPanel') private infoPanel;
  private enableRowSelection = true;
  private enableGridFooter = true;
  private displayedColumns = ['select', 'client', 'project', 'description', 'comment', 'status', 'duration'];
  private displayedColumnsProperties = {
    duration: {
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
  private dataSource = new MatTableDataSource();
  private selection = new SelectionModel<TimeSheet>(true, []);
  private loading = false;
  private date;
  @ViewChild('table') private table;

  constructor(private timeSheetService: TimeSheetService) {
  }

  ngOnInit() {
  }

  applyLocalFilter(filterValue: string) {
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
      this.dataSource.filteredData.forEach((row: TimeSheet) => this.selection.select(row));
    }
  }


  loadTimeSheetForSelectedDate(date: Date) {
    this.selection.clear();
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

  getTotalHours() {
    return Util.formatTimeDuration(this.dataSource.filteredData.map((t: any) => t.duration).reduce((acc, value) => acc + value, 0));
  }

  toggleInfoPanel () {
    this.infoPanel.toggle();
  }

  infoPanelToggleButtonText () {
    return this.infoPanel.opened? "Hide info panel": "Show info pannel";
  }
}
