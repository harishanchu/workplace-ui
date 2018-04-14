import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Util} from '../../../../helpers/util';
import {ValidationMixin} from '../../../../mixins/validation.mixin';
import {TimeSheetEntry} from '../../../../models/time-sheet-entry';
import {TimeSheetService} from '../../../../services/time-sheet.service';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-time-sheet-entry',
  templateUrl: './time-sheet-entry.component.html',
  styleUrls: ['./time-sheet-entry.component.scss']
})
export class TimeSheetEntryComponent implements OnInit {
  private title;
  private form: FormGroup;
  private clients = [
    {name: 'Internal', value: 'internal'},
    {name: 'Client 1', value: 'client1'},
    {name: 'Client 2', value: 'client2'}
  ];
  private statuses = [
    {name: 'Completed', value: 'completed'},
    {name: 'In Progress', value: 'inProgress'}
  ];
  private projects = [
    {name: 'General', value: 'general'},
    {name: 'Internal', value: 'internal'}
  ];

  constructor(public dialogRef: MatDialogRef<TimeSheetEntryComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder,
              private timeSheetService: TimeSheetService, private notificationService: NotificationService) {
    this.title = data.title;
    this.form = fb.group({
      'client': ['', Validators.required],
      'project': ['', Validators.required],
      'status': ['', Validators.required],
      'duration': [1, Validators.required],
      'comment': ['']
    });
  }

  ngOnInit() {
  }

  public addTimeSheet(): void {
    if (this.form.valid) {
      this.timeSheetService.addTimeSheet(<TimeSheetEntry>this.form.value).subscribe(
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
