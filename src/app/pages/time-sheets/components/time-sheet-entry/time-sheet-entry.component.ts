import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Util} from '../../../../helpers/util';
import {ValidationMixin} from '../../../../mixins/validation.mixin';
import {TimeSheet} from '../../../../models/time-sheet';
import {Task} from '../../../../models/task';
import {TimeSheetService} from '../../../../services/time-sheet.service';
import {NotificationService} from '../../../../services/notification.service';
import {AppService} from '../../../../services/app.service';
import {OpenTasksListComponent} from '../open-tasks-list/open-tasks-list.component';
import {TaskService} from '../../../../services/task.service';

@Component({
  selector: 'app-time-sheet-entry',
  templateUrl: './time-sheet-entry.component.html',
  styleUrls: ['./time-sheet-entry.component.scss']
})
export class TimeSheetEntryComponent implements OnInit {
  private title;
  private date;
  private form: FormGroup;
  private editFormData;
  private gridCmp;
  private type: string;
  private taskId;
  private clients = <any>[];
  private projects = <any>[];
  private taskTypes = <any>[];
  private projectsUnfiltered = <any>[];
  private statuses = [
    {name: 'Completed', value: 'completed'},
    {name: 'In Progress', value: 'inProgress'}
  ];

  constructor(public dialogRef: MatDialogRef<TimeSheetEntryComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private fb: FormBuilder,
              private timeSheetService: TimeSheetService,
              private taskService: TaskService,
              private notificationService: NotificationService,
              private appService: AppService,
              public dialog: MatDialog) {
    this.title = data.title;
    this.type = data.type;
    this.gridCmp = data.gridCmp;
    this.form = fb.group({
      'clientId': ['', Validators.required],
      'projectId': ['', Validators.required],
      'status': ['', Validators.required],
      'duration': [1, [Validators.required, Validators.min(1), Validators.max(600)]],
      'description': ['', Validators.required],
      'type': ['', Validators.required],
      'comment': ['']
    });

    if (this.type === 'update') {
      this.editFormData = this.data.formData;
      this.disableTaskEditing();
      this.date = this.editFormData.date;
      this.taskId = this.editFormData.taskId;
      this.loadTimeSheetDataToForm(this.editFormData);
    } else {
      this.date = data.date;
    }
  }

  ngOnInit() {
    this.appService.getClients(false).subscribe(clients => {
        this.clients = clients;
      },
      error => {
        this.notificationService.error('Failed to load clients');
      });
    this.appService.getTaskTypes().subscribe(types => {
      this.taskTypes = types;
      if (!this.form.controls['type'].value) {
        this.form.controls['type'].setValue(types[0]);
      }
    });

    this.loadComboStores();
  }

  loadComboStores() {
    this.appService.getProjects().subscribe(projects => {
        this.projectsUnfiltered = projects;

        /**
         * If client is already selected filter projects list
         * (In case of edit client will be loaded already).
         */
        this.populateProjectsBasedOnClient();
      },
      error => {
        this.notificationService.error('Failed to load projects');
      });
  }

  populateProjectsBasedOnClient() {
    const clientId = this.form.controls.clientId.value;

    if (clientId) {
      this.projects = this.projectsUnfiltered.filter(function (project) {
        return project.clientId === clientId;
      });
    }
  }

  public onSaveTimeSheetClick(): void {
    if (this.form.valid) {
      const formValues = this.form.value;
      const timeSheet: TimeSheet = {
        status: formValues.status,
        duration: formValues.duration,
        comment: formValues.comment,
        taskId: this.taskId
      };


      if (this.type === 'new') {
        timeSheet.date = this.date;

        if (!timeSheet.taskId) {
          const task = {
            projectId: formValues.projectId,
            description: formValues.description,
            type: formValues.type
          };

          this.createTask(task, function (error, data) {
            if (error) {
              this.notificationService.error(error.error.error.message);
            } else {
              timeSheet.taskId = data.id;

              this.createTimeSheet(timeSheet);
            }
          });
        } else {
          this.createTimeSheet(timeSheet);
        }
      } else {
        timeSheet.taskId = this.taskId;
        this.updateTimeSheet(timeSheet);
      }
    }
  }

  createTask(task: Task, callback) {
    this.taskService.createTask(<Task>task).subscribe(
      data => {
        return callback.call(this, null, data);
      },
      callback.bind(this)
    );
  }

  createTimeSheet(timeSheet: TimeSheet) {
    // Create new time sheet;
    this.timeSheetService.createTimeSheet(<TimeSheet>timeSheet).subscribe(
      data => {
        this.gridCmp.appendItem(data);
        this.dialogRef.close();
      },
      error => {
        this.notificationService.error(error.error.error.message);
      }
    );
  }

  updateTimeSheet(timeSheet: TimeSheet) {
    // Update time sheet;
    this.timeSheetService.updateTimeSheet(this.editFormData.id, <TimeSheet>timeSheet).subscribe(
      data => {
        this.gridCmp.updateItem(this.editFormData, data);
        this.dialogRef.close();
      },
      error => {
        this.notificationService.error(error.error.error.message);
      }
    );
  }


  loadTimeSheetDataToForm(data) {
    this.form.setValue({
      projectId: data.projectId,
      status: data.status,
      duration: data.duration,
      comment: data.comment,
      description: data.description,
      clientId: data.clientId,
      type: data.type,
    });
  }

  loadTaskData({clientId, projectId, description, type}) {
    this.form.controls.clientId.setValue(clientId);
    this.form.controls.projectId.setValue(projectId);
    this.form.controls.description.setValue(description);
    this.form.controls.type.setValue(type);
    this.populateProjectsBasedOnClient();
  }

  disableTaskEditing() {
    this.form.controls.clientId.disable();
    this.form.controls.description.disable();
    this.form.controls.projectId.disable();
    this.form.controls.type.disable();
  }

  resetTaskFields() {
    this.form.controls.clientId.reset();
    this.form.controls.description.reset();
    this.form.controls.projectId.reset();
    this.form.controls.type.reset();
  }

  enableTaskEditing() {
    this.resetTaskFields();

    this.form.controls.clientId.enable();
    this.form.controls.description.enable();
    this.form.controls.projectId.enable();
    this.form.controls.type.enable();
  }

  showOpenTasks() {
    const dialogRef = this.dialog.open(OpenTasksListComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        this.taskId = result.id;
        this.loadTaskData(result);
        this.disableTaskEditing();
      } else {
        this.removeLinkedTask();
      }
    });
  }

  removeLinkedTask() {
    this.taskId = undefined;
    this.enableTaskEditing();
  }

  formatTimeRangeValue(value: number | null) {
    return Util.formatTimeDuration(value);
  }
}

Util.mixin(TimeSheetEntryComponent, [ValidationMixin]);
