import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Util} from '../../../../helpers/util';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {TimeSheet} from '../../../../models/time-sheet';
import {TimeSheetService} from '../../../../services/time-sheet.service';

import {merge} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-time-sheet-grid-info',
  templateUrl: './time-sheet-grid-info.component.html',
  styleUrls: ['./time-sheet-grid-info.component.scss']
})
export class TimeSheetGridInfoComponent implements OnInit {
  @Input() gridSelection: SelectionModel<TimeSheet>;
  @Input() panelState: EventEmitter<boolean>;
  private isOpened: boolean;
  private infoLoaded = false;
  private displayedColumns = ['description', 'status', 'duration'];
  private displayedColumnsProperties = {
    duration: {
      formatter: Util.formatTimeDuration,
      title: 'Total time spent'
    },
    status: {
      formatter: function (value: string) {
        if (value === 'inProgress') {
          value = 'Open';
        } else {
          value = 'Closed';
        }

        return value;
      }
    }
  };
  private dataSource = new MatTableDataSource();

  constructor(private timeSheetService: TimeSheetService) {
  }

  ngOnInit() {
    merge(
      this.gridSelection.onChange,
      this.panelState.pipe(
        filter(value => {
          this.isOpened = value;
          return value === true;
        })
      )
    ).subscribe(() => this.loadTaskSummary());
  }

  loadTaskSummary() {
    if (this.isOpened) {
      this.infoLoaded = true;
      const taskIds = this.gridSelection.selected.map((timeSheet) => timeSheet.taskId);

      this.timeSheetService.getTaskSummary(taskIds).subscribe((data) => {
        this.dataSource.data = data;
      });
    } else {
      this.infoLoaded = false;
    }
  }

  getInfoPanelTitle() {
    let title: string;

    if (!this.gridSelection.selected.length) {
      title = 'Select a record';
    } else if (this.gridSelection.selected.length === 1) {
      title = this.gridSelection.selected[0].description.trim();
    } else {
      title = this.gridSelection.selected.length + ' timesheets selected';
    }

    return title;
  }

  getTotalHours() {
    return Util.formatTimeDuration(this.dataSource.filteredData.map((t: any) => t.duration).reduce((acc, value) => acc + value, 0));
  }
}
