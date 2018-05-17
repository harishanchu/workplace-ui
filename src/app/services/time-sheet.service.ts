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
    return this.http.post(`users/me/tasks`, task).map(response => {
      return response;
    });
  }

  createTimeSheet(timeSheetEntry: TimeSheet) {
    return this.http.post(`users/me/time-sheets`, timeSheetEntry).map(response => {
      return response;
    });
  }

  updateTimeSheet(id, timeSheetEntry: TimeSheet) {
    return this.http.put(`users/me/time-sheets/${id}`, timeSheetEntry).map(response => {
      return response;
    });
  }

  deleteTimeSheet(timeSheetId) {
    return this.http.delete(`users/me/time-sheets/${timeSheetId}`).map(response => {
      return response;
    });
  }

  getOpenTasksForUser(user, includeDetails = false) {
    const params: any = {
      filter: {where: {status: 'open'}}
    };

    if (includeDetails) {
      params.filter.include = {project: 'client'};
    }

    params.filter = JSON.stringify(params.filter);

    return this.http.get(`users/${user}/tasks`, {params}).map((response: any[]) => {
      return response.map(({id, project, comment}) => ({
        id,
        client: project.client.name,
        clientId: project.client.id,
        project: project.name,
        projectId: project.id,
        comment
      }));

    });
  }

  getCurrentUserTimeSheets(selectedDate: Date, includeDetails = false) {
    const params: any = {filter: {where: {date: Util.formatDate(selectedDate)}}};

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

  getAllUserTimeSheets(fromDate: Date, toDate: Date, includeDetails = false, sort = 'user', direction = 'asc', pageIndex = 1) {
    const params: any = {
      filter: {
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
      {params, observe: 'response'}).map((response: any[]) => {debugger;
      return {
        data: response.body.map(({id, date, taskId, task, duration, status, user}) => ({
          id,
          date,
          taskId,
          projectId: task.projectId,
          project: task.project.name,
          clientId: task.project.clientId,
          client: task.project.client.name,
          comment: task.comment,
          user: user.name,
          duration,
          status
        })),
        total:
      };
    });
  }
}
