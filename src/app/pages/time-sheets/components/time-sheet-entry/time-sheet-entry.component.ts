import {Component, OnInit, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-time-sheet-entry',
  templateUrl: './time-sheet-entry.component.html',
  styleUrls: ['./time-sheet-entry.component.scss']
})
export class TimeSheetEntryComponent implements OnInit {
  private formControl = new FormControl('', [Validators.required]);

  statuses = [
    {name: 'Completed', value: 'completed'},
    {name: 'In Progress', value: 'inProgress'}
  ];

  projects = [
    {name: 'General', value: 'general'},
    {name: 'Internal', value: 'internal'}
  ];

  constructor(public dialogRef: MatDialogRef<TimeSheetEntryComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'This field required' : '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }

  public confirmAdd(): void {
    // this.dataService.addIssue(this.data);
  }

}
