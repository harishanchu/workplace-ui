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
  private clients = <any>[];
  private projects = <any>[];
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
    this.date = data.date;
    this.form = fb.group({
      'client': ['', Validators.required],
      'projectId': ['', Validators.required],
      'status': ['', Validators.required],
      'duration': [1, Validators.required],
      'comment': [''],
      'taskId': ['']
    });

    if (this.data.formData) {
      const value = (({projectId, status, duration, comment, taskId, clientId}) => ({
        projectId,
        status,
        duration,
        comment,
        taskId,
        client: clientId
      }))(this.data.formData);
      this.form.setValue(value);
    }
  }

  ngOnInit() {
    this.appService.getClients(true).subscribe(clients => {
      this.clients = clients;
    });
  }

  populateProjectsBasedOnClient(event) {
    const client = event.value;

    if (client) {
      this.projects = client.projects;
    }
  }

  public addTimeSheet(): void {
    if (this.form.valid) {
      const timeSheet: TimeSheet = (({projectId, status, duration, comment, taskId}, date) => ({
        projectId,
        status,
        duration,
        comment,
        taskId,
        date
      }))(this.form.value, this.date);

      this.timeSheetService.createTimeSheet(<TimeSheet>timeSheet).subscribe(
        data => {
          // this.router.navigate([this.returnUrl]);
          console.log('time sheet saved')
        },
        error => {
          this.notificationService.error(error.error.error.message);
        }
      );
    }
  }

}

Util.mixin(TimeSheetEntryComponent, [ValidationMixin]);
