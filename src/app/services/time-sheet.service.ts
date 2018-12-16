import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TimeSheet} from '../models/time-sheet';
import {Util} from '../helpers/util';
import {Globals} from '../globals';
import {AuthService} from './auth.service';

@Injectable()
export class TimeSheetService {
  constructor(private http: HttpClient, private globals: Globals, private authService: AuthService) {
  }

  static formatAllUserTimeSheetsApiFilter(data) {
    let where: any = {};

    if (data.advancedFilters) {
      where = Util.formatApiFilter(data.advancedFilters.filterableFields, data.advancedFilters.items);
    }

    where.date = {between: [Util.formatDate(data.fromDate), Util.formatDate(data.toDate)]};

    if (data.clientId[0] !== 'all') {
      Util.objectSet(where, 'task.project.clientId.inq', data.clientId);
    }

    if (data.projectId[0] !== 'all') {
      Util.objectSet(where, 'task.projectId.inq', data.projectId);
    }

    return where;
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

  deleteTimeSheet(timeSheetIds) {
    if (timeSheetIds.length === 1) {
      return this.http.delete(`users/me/time-sheets/${timeSheetIds[0].id}`).pipe(map(response => {
        return response;
      }));
    } else {
      return this.http.request('delete', 'time-sheets', {body: {id: timeSheetIds.map(sheet => sheet.id)}}).pipe(map(response => {
        return response;
      }));
    }
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
      return response.map(({id, project, description, type}) => ({
        id,
        client: project.client.name,
        clientId: project.client.id,
        project: project.name,
        projectId: project.id,
        description,
        type: type
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
        type: task.type,
        comment,
        duration,
        status
      }));
    }));
  }

  _getAllUserTimeSheets(filters: { fromDate: Date, toDate: Date }, includeDetails = false,
                        sort = 'status', direction = 'asc',
                        downLoad: any = false, pageIndex = 0, pageSize = 10) {
    const params: any = {
      filter: {
        order: [sort + ' ' + direction, 'id asc'],
        where: TimeSheetService.formatAllUserTimeSheetsApiFilter(filters)
      }
    };

    if (includeDetails) {
      params.filter.include = [{task: {project: 'client'}}, 'user'];
    }

    if (!downLoad) {
      params.filter.skip = pageIndex * pageSize;
      params.filter.limit = pageSize;
    }

    params.filter = JSON.stringify(params.filter);

    if (downLoad) {
      params.format = downLoad;
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
          type: task.type,
          comment,
          user: user.name,
          duration,
          status
        })),
        total: response.headers.get('x-total-count') || 0
      };
    }));
  }

  downloadAllUserTimeSheets(filters, includeDetails, sort, direction, advanced = false) {
    let format = 'basic';

    if (advanced) {
      format = 'advanced';
    }

    this._getAllUserTimeSheets(filters, includeDetails, sort, direction, format);
  }
}
