import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MatTableDataSource} from '@angular/material';
import {Task} from '../../../../models/task';
import {SelectionModel} from '@angular/cdk/collections';
import {TimeSheetService} from '../../../../services/time-sheet.service';

@Component({
  selector: 'app-open-tasks-list',
  templateUrl: './open-tasks-list.component.html',
  styleUrls: ['./open-tasks-list.component.scss']
})
export class OpenTasksListComponent implements OnInit {
  private displayedColumns = ['client', 'project', 'description'];
  private dataSource = new MatTableDataSource();
  private selection = new SelectionModel<Task>(true, []);
  private loading = false;
  @ViewChild('table') private table;

  constructor(private timeSheetService: TimeSheetService,
              public dialogRef: MatDialogRef<OpenTasksListComponent>) {
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;

    this.timeSheetService.getOpenTasksForUser('me', true)
      .subscribe(
        tasks => {
          this.dataSource.data = tasks;
        },
        err => {
        },
        () => {
          this.loading = false;
        }
      );
  }

}
