import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {TimeSheet} from '../../../../models/time-sheet';
import {TimeSheetService} from '../../../../services/time-sheet.service';
import {Util} from '../../../../helpers/util';
import {AuthService} from '../../../../services/auth.service';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-time-sheet-grid',
  templateUrl: './time-sheet-grid.component.html',
  styleUrls: ['./time-sheet-grid.component.scss']
})
export class TimeSheetGridComponent implements OnInit {
  public enableRowSelection = true;
  public enablePagination = false;
  public advancedFilter = false;
  public enableGridFooter = true;
  public displayedColumns = ['select', 'client', 'project', 'description', 'comment', 'status', 'duration'];
  public defaultSort = 'status';
  public dataSource = new MatTableDataSource();
  public selection = new SelectionModel<TimeSheet>(true, []);
  public loading = false;
  @ViewChild('infoPanel') private infoPanel;
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
  private date;
  @ViewChild('table') private table;

  constructor(private timeSheetService: TimeSheetService, private authService: AuthService, private notificationService: NotificationService) {
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
        error => {
          this.notificationService.error('Failed to load time sheets');
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

  toggleInfoPanel() {
    this.infoPanel.toggle();
  }

  infoPanelToggleButtonText() {
    return this.authService.getUserPreference('showTimeSheetGridInfoPanel') ? 'Hide info panel' : 'Show info pannel';
  }
}
