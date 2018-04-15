import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TimeSheetEntry} from '../models/time-sheet-entry';

@Injectable()
export class TimeSheetService {

  constructor(private http: HttpClient) {
  }

  addTimeSheet (timeSheetEntry: TimeSheetEntry) {
    return this.http.post('time-sheets', timeSheetEntry).map(response => {
      return response;
    });
  }
}
