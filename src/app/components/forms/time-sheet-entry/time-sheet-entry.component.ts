import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-time-sheet-entry',
  templateUrl: './time-sheet-entry.component.html',
  styleUrls: ['./time-sheet-entry.component.scss']
})
export class TimeSheetEntryComponent implements OnInit {
  statusControl = new FormControl('', [Validators.required]);
  projectControl = new FormControl('', [Validators.required]);

  statuses = [
    {name: 'Completed', value: 'completed'},
    {name: 'In Progress', value: 'inProgress'}
  ];

  projects = [
    {name: 'General', value: 'general'},
    {name: 'Internal', value: 'internal'}
  ];

  ngOnInit() {
  }

}
