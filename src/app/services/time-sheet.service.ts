import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TimeSheet} from '../models/time-sheet';
import {Task} from '../models/task';
import {Util} from '../helpers/util';

@Injectable()
export class TimeSheetService {
  constructor(private http: HttpClient) {
  }

  createTask(task: Task) {
    return this.http.post(`users/me/tasks`, task).pipe(map(response => {
      return response;
    }));
  }

  createTimeSheet(timeSheetEntry: TimeSheet) {
    return this.http.post(`users/me/time-sheets`, timeSheetEntry).pipe(map(response => {
      return response;
    }));
  }

  updateTimeSheet(id, timeSheetEntry: TimeSheet) {
    return this.http.put(`users/me/time-sheets/${id}`, timeSheetEntry).pipe(map(response => {
      return response;
    }));
  }

  deleteTimeSheet(timeSheetId) {
    return this.http.delete(`users/me/time-sheets/${timeSheetId}`).pipe(map(response => {
      return response;
    }));
  }

  getOpenTasksForUser(user, includeDetails = false) {
    const params: any = {
      filter: {where: {status: 'open'}}
    };

    if (includeDetails) {
      params.filter.include = {project: 'client'};
    }

    params.filter = JSON.stringify(params.filter);

    return this.http.get(`users/${user}/tasks`, {params}).pipe(map((response: any[]) => {
      return response.map(({id, project, description}) => ({
        id,
        client: project.client.name,
        clientId: project.client.id,
        project: project.name,
        projectId: project.id,
        description
      }));

    }));
  }

  getCurrentUserTimeSheets(selectedDate: Date, includeDetails = false) {
    const params: any = {filter: {where: {date: Util.formatDate(selectedDate)}}};

    if (includeDetails) {
      params.filter.include = {task: {project: 'client'}};
    }

    params.filter = JSON.stringify(params.filter);

    return this.http.get(`users/me/time-sheets`,
      {params}).pipe(map((response: any[]) => {
      return response.map(({id, date, taskId, task, duration, status, comment}) => ({
        id,
        date,
        taskId,
        projectId: task.projectId,
        project: task.project.name,
        clientId: task.project.clientId,
        client: task.project.client.name,
        description: task.description,
        comment,
        duration,
        status
      }));
    }));
  }

  getAllUserTimeSheets(fromDate: Date, toDate: Date, includeDetails = false, sort = 'status', direction = 'asc', pageIndex = 0, pageSize = 10) {
    const params: any = {
      filter: {
        skip: pageIndex * pageSize,
        limit: pageSize,
        order: sort + ' ' + direction,
        where: {
          date: {between: [Util.formatDate(fromDate), Util.formatDate(toDate)]}
        }
      }
    };

    if (includeDetails) {
      params.filter.include = [{task: {project: 'client'}}, 'user'];
    }

    params.filter = JSON.stringify(params.filter);

    return this.http.get(`time-sheets`,
      {params, observe: 'response'}).pipe(map((response: any) => {
      return {
        items: response.body.map(({id, date, taskId, task, duration, status, user, comment}) => ({
          id,
          date,
          taskId,
          projectId: task.projectId,
          project: task.project.name,
          clientId: task.project.clientId,
          client: task.project.client.name,
          description: task.description,
          comment,
          user: user.name,
          duration,
          status
        })),
        total: response.headers.get('x-total-count') || 0
      };
    }));
  }
}
