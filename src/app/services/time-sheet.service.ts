import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TimeSheet} from '../models/time-sheet';
import {AuthService} from './auth.service';

@Injectable()
export class TimeSheetService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  addTimeSheet(timeSheetEntry: TimeSheet) {
    return this.http.post('time-sheets', timeSheetEntry).map(response => {
      return response;
    });
  }

  getCurrentUserTimeSheets(date: string) {
    const userId = this.authService.getAuthUserId();

    return this.http.get(`users/${userId}/time-sheets`).map(response => {
      debugger;
    });
  }
}
