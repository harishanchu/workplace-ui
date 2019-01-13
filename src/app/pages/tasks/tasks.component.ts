import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {TaskService} from '../../services/task.service';
import {NotificationService} from '../../services/notification.service';
import {TaskEntryComponent} from './components/task-entry/task-entry.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public title = 'Tasks';
  @ViewChild('taskGrid') public grid;

  constructor(public dialog: MatDialog, private taskService: TaskService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  editEntry(timeSheet) {
    const dialogRef = this.dialog.open(TaskEntryComponent, {
      data: {
        title: 'Edit task',
        formData: timeSheet,
        type: 'update',
        gridCmp: this.grid
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.refreshTable();
      }
    });
  }

  deleteEntry(taskId) {
    this.taskService.deleteTask(taskId).subscribe(
      data => {
        this.grid.reloadGrid();
      },
      error => {
        this.notificationService.error(error.error.error.message);
      }
    );
  }
}
