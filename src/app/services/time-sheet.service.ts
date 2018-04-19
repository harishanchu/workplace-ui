import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TimeSheet} from '../models/time-sheet';
import {Task} from '../models/task';

@Injectable()
export class TimeSheetService {
  constructor(private http: HttpClient) {
  }

  createTask(task: Task) {
    return this.http.post(`users/me/tasks`, task).map(response => {
      return response;
    });
  }

  createTimeSheet(timeSheetEntry: TimeSheet) {
    return this.http.post(`users/me/time-sheets`, timeSheetEntry).map(response => {
      return response;
    });
  }

  updateTimeSheet (id, timeSheetEntry: TimeSheet) {
    return this.http.put(`users/me/time-sheets/${id}`, timeSheetEntry).map(response => {
      return response;
    });
  }

  deleteTimeSheet (timeSheetId) {
    return this.http.delete(`users/me/time-sheets/${timeSheetId}`).map(response => {
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
      return response.map(({id, date, taskId, task, duration, status}) => ({
        id,
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
