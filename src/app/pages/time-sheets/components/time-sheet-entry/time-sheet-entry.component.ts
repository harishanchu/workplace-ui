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
  private form: FormGroup;
  private clients = [];
  private projects = [];
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
    this.form = fb.group({
      'client': ['', Validators.required],
      'projectId': ['', Validators.required],
      'status': ['', Validators.required],
      'duration': [1, Validators.required],
      'comment': ['']
    });
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
      this.timeSheetService.addTimeSheet(<TimeSheet>this.form.value).subscribe(
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
