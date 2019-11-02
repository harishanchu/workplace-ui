import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MatTableDataSource} from '@angular/material';
import {Task} from '../../../../models/task';
import {SelectionModel} from '@angular/cdk/collections';
import {TimeSheetService} from '../../../../services/time-sheet.service';
import {NotificationService} from '../../../../services/notification.service';
import {TaskService} from '../../../../services/task.service';

@Component({
  selector: 'app-open-tasks-list',
  templateUrl: './open-tasks-list.component.html',
  styleUrls: ['./open-tasks-list.component.scss']
})
export class OpenTasksListComponent implements OnInit {
  public loading = false;
  private displayedColumns = ['client', 'project', 'type', 'description', 'action'];
  private dataSource = new MatTableDataSource();
  private selection = new SelectionModel<Task>(true, []);
  @ViewChild('table') private table;

  constructor(private timeSheetService: TimeSheetService,
              private taskService: TaskService,
              public dialogRef: MatDialogRef<OpenTasksListComponent>, private notificationService: NotificationService) {
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
        error => {
          this.notificationService.error('Failed to load open tasks');
        },
        () => {
          this.loading = false;
        }
      );
  }

  closeTask(taskId) {
    this.loading = true;
    this.taskService.updateTask(taskId, {status: 'closed'} as Task).subscribe(
      data => {
        const index = this.dataSource.data.findIndex((task: any) => taskId === task.id);

        this.dataSource.data.splice(index, 1);
      },
      error => {
        this.notificationService.error(error.error.error.message);
      }
    ).add(() => this.loading = false);
  }
}
