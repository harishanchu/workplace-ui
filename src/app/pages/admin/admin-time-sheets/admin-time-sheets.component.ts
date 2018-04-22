import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from '../../../services/notification.service';
import {TimeSheetService} from '../../../services/time-sheet.service';
import {MatDatepickerInputEvent} from '@angular/material';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-time-sheets',
  templateUrl: './admin-time-sheets.component.html',
  styleUrls: ['../../time-sheets/time-sheets.component.scss', './admin-time-sheets.component.scss']
})
export class AdminTimeSheetsComponent implements OnInit {
  private title: string;
  private form;
  @ViewChild('timeSheetGrid') private grid;
  // @Input('fromDate') private fromDate: Date = new Date();
  // @Input('toDate') private toDate: Date = new Date();
  private maxDate: Date = new Date();

  constructor(private timeSheetService: TimeSheetService,
              private notificationService: NotificationService,
              private fb: FormBuilder) {
    this.title = 'Time Sheets';
    this.form = fb.group({
      'fromDate': [new Date(), Validators.required],
      'toDate': [new Date(), Validators.required]
    });
  }

  ngOnInit() {
    this.refreshGrid();
  }

  onDatePick(event: MatDatepickerInputEvent<Date>) {
    this.refreshGrid();
  }

  refreshGrid () {
    this.grid.loadTimeSheetForSelectedDate(this.form.value.fromDate, this.form.value.toDate);
  }
}
