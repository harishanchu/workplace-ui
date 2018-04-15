import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TimeSheet} from '../models/time-sheet';

@Injectable()
export class TimeSheetService {

  constructor(private http: HttpClient) {
  }

  createTimeSheet(timeSheetEntry: TimeSheet) {
    return this.http.post(`users/me/time-sheets`, timeSheetEntry).map(response => {
      return response;
    });
  }

  getCurrentUserTimeSheets(selectedDate: Date, includeDetails) {
    const params: any = {filter: {where: {date: selectedDate.toISOString().slice(0, 10)}}};

    if (includeDetails) {
      params.filter.include = {task: {project: 'client'}};
    }

    params.filter = JSON.stringify(params.filter);

    return this.http.get(`users/me/time-sheets`,
      {params}).map((response: any[]) => {
      return response.map(({date, taskId, task, duration, status}) => ({
        date,
        taskId,
        projectId: task.projectId,
        project: task.project.name,
        clientId: task.project.clientId,
        client: task.project.client.name,
        comment: task.comment,
        duration,
        status
      }));
    });
  }
}
