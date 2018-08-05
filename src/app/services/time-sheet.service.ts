import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TimeSheet} from '../models/time-sheet';
import {Task} from '../models/task';
import {Util} from '../helpers/util';
import {Globals} from '../globals';
import {AuthService} from './auth.service';

@Injectable()
export class TimeSheetService {
  constructor(private http: HttpClient, private globals: Globals, private authService: AuthService) {
  }

  static formatAllUserTimeSheetsApiFilter(data) {
    const where = {
      date: {between: [Util.formatDate(data.fromDate), Util.formatDate(data.toDate)]}
    };

    if (data.clientId[0] !== 'all') {
      Util.objectSet(where, 'task.project.clientId.inq', data.clientId);
    }

    if (data.projectId[0] !== 'all') {
      Util.objectSet(where, 'task.projectId.inq', data.projectId);
    }

    if (data.advancedFilters) {
      const filterableFields = data.advancedFilters.filterableFields;

      data.advancedFilters.items.forEach(function (item) {
        const bits = item.match(/^\s*([a-z]+?)\s*([!=><]+)\s*([a-z0-9A-Z* ]+)$/);

        bits[3] = bits[3].trim();

        switch (bits[2]) {
          case '=':
            if (bits[3].indexOf('*') > -1) {
              Util.objectSet(where, `${filterableFields[bits[1]]}.like`, bits[3].replace(/\*/g, '%'));
            } else {
              Util.objectPush(where, `${filterableFields[bits[1]]}.inq`, bits[3]);
            }
            break;

          case '!=':
            if (bits[3].indexOf('*') > -1) {
              Util.objectSet(where, `${filterableFields[bits[1]]}.nlike`, bits[3].replace(/\*/g, '%'));
            } else {
              Util.objectPush(where, `${filterableFields[bits[1]]}.nin`, bits[3]);
            }
            break;

          case '>':
            Util.objectPush(where, `${filterableFields[bits[1]]}.gt`, bits[3]);
            break;

          case '<':
            Util.objectPush(where, `${filterableFields[bits[1]]}.lt`, bits[3]);
            break;
        }

      });
    }

    return where;
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

  _getAllUserTimeSheets(filters: { fromDate: Date, toDate: Date }, includeDetails = false,
                        sort = 'status', direction = 'asc',
                        downLoad = false, pageIndex, pageSize) {
    const params: any = {
      filter: {
        skip: pageIndex * pageSize,
        limit: pageSize,
        order: sort + ' ' + direction,
        where: TimeSheetService.formatAllUserTimeSheetsApiFilter(filters)
      }
    };

    if (includeDetails) {
      params.filter.include = [{task: {project: 'client'}}, 'user'];
    }

    params.filter = JSON.stringify(params.filter);

    if (downLoad) {
      window.location.href = this.globals.baseApiUrl + 'time-sheets/download?' +
        new HttpParams({fromObject: params}).toString()
        + '&access_token=' + this.authService.getAuthToken();
    } else {
      return this.http.get('time-sheets',
        {params, observe: 'response'});
    }
  }

  getAllUserTimeSheets(filters, includeDetails, sort, direction, pageIndex = 0, pageSize = 10) {
    return this._getAllUserTimeSheets(
      filters, includeDetails,
      sort, direction, false,
      pageIndex, pageSize).pipe(map((response: any) => {
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

  downloadAllUserTimeSheets(...args) {
    this._getAllUserTimeSheets.apply(this, [...args, true]);
  }
}
