import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Util} from '../../../../helpers/util';
import {ValidationMixin} from '../../../../mixins/validation.mixin';
import {TimeSheet} from '../../../../models/time-sheet';
import {TimeSheetService} from '../../../../services/time-sheet.service';
import {NotificationService} from '../../../../services/notification.service';
import {AppService} from '../../../../services/app.service';

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
  private type: string;
  private clients = <any>[];
  private projects = <any>[];
  private projectsUnfiltered = <any>[];
  private statuses = [
    {name: 'Completed', value: 'completed'},
    {name: 'In Progress', value: 'inProgress'}
  ];

  constructor(public dialogRef: MatDialogRef<TimeSheetEntryComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private fb: FormBuilder,
              private timeSheetService: TimeSheetService,
              private notificationService: NotificationService,
              private appService: AppService) {
    this.title = data.title;
    this.type = data.type;
    this.form = fb.group({
      'client': ['', Validators.required],
      'projectId': ['', Validators.required],
      'status': ['', Validators.required],
      'duration': [1, Validators.required],
      'comment': [''],
      'taskId': ['']
    });

    if (this.type === 'update') {
      this.editFormData = this.data.formData;
      this.disableTaskEditing();
      this.date = this.editFormData.date;
      this.loadTimeSheetDataToForm(this.editFormData);
    } else {
      this.date = data.date;
    }
  }

  ngOnInit() {
    this.appService.getClients(false).subscribe(clients => {
      this.clients = clients;
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
    });
  }

  populateProjectsBasedOnClient() {
    const client = this.form.controls.client.value;

    if (client) {
      this.projects = this.projectsUnfiltered.filter(function (project) {
        return project.clientId === client;
      });
    }
  }

  public saveTimeSheet(): void {
    if (this.form.valid) {
      const timeSheet: TimeSheet = (({projectId, status, duration, comment, taskId}, date) => ({
        projectId,
        status,
        duration,
        comment,
        taskId,
        date
      }))(this.form.value, this.date);


      if (this.type === 'new') {
        // Create new time sheet;
        this.timeSheetService.createTimeSheet(<TimeSheet>timeSheet).subscribe(
          data => {
            // @todo: add newly added item to grid.
            this.dialogRef.close();
          },
          error => {
            this.notificationService.error(error.error.error.message);
          }
        );
      } else {
        // Update time sheet;
        this.timeSheetService.updateTimeSheet(<TimeSheet>timeSheet).subscribe(
          data => {
            // @todo: refresh updates to grid.
            this.dialogRef.close();
          },
          error => {
            this.notificationService.error(error.error.error.message);
          }
        );
      }
    }
  }

  loadTimeSheetDataToForm(data) {
    const value = (({projectId, status, duration, comment, taskId, clientId}) => ({
      projectId,
      status,
      duration,
      comment,
      taskId,
      client: clientId
    }))(data);
    this.form.setValue(value);
  }

  disableTaskEditing() {
    this.form.controls.client.disable();
    this.form.controls.comment.disable();
    this.form.controls.projectId.disable();
  }
}

Util.mixin(TimeSheetEntryComponent, [ValidationMixin]);
