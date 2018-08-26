import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {Task} from '../models/task';
import {Util} from '../helpers/util';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  createTask(task: Task) {
    return this.http.post(`users/me/tasks`, task).pipe(map(response => {
      return response;
    }));
  }

  getTaskSummary(ids) {
    const filter = JSON.stringify({
      'where': {'id': {'inq': ids}},
      'include': {'relation': 'timeSheets', 'scope': {'fields': ['duration']}}
    });

    return this.http.get('tasks', {
      params: {
        filter: filter
      }
    }).pipe(map((response: any[]) => {
      return response.map(({description, status, timeSheets}) => ({
        description,
        status,
        count: timeSheets.length,
        duration: timeSheets.reduce((sum, timeSheet) => sum + timeSheet.duration, 0)
      }));
    }));
  }


  getCurrentUserTasks(filters, includeDetails = false, sort: any = false, direction = 'asc', pageIndex = 0, pageSize = 10) {
    const sortOrder = ['id desc'];

    if (sort) {
      sortOrder.unshift(sort + ' ' + direction);
    }

    const params: any = {
      filter: {
        skip: pageIndex * pageSize,
        limit: pageSize,
        order: sortOrder
      }
    };

    if (filters.advancedFilters) {
      params.filter.where = Util.formatApiFilter(filters.advancedFilters.filterableFields, filters.advancedFilters.items);
    }

    if (includeDetails) {
      params.filter.include = {project: 'client'};
    }

    params.filter = JSON.stringify(params.filter);

    return this.http.get(`users/me/tasks`, {params, observe: 'response'}).pipe(map((response: any) => {
      return {
        items: response.body.map(({id, status, type, description, projectId, project, client}) => ({
          id,
          projectId: projectId,
          project: project.name,
          clientId: project.clientId,
          client: project.client.name,
          description: description,
          type: type,
          status
        })),
        total: response.headers.get('x-total-count') || 0
      };
    }));
  }

  updateTask(id, task: Task) {
    return this.http.put(`users/me/tasks/${id}`, task).pipe(map(response => {
      return response;
    }));
  }

  deleteTask(taskId) {
    return this.http.delete(`users/me/tasks/${taskId}`).pipe(map(response => {
      return response;
    }));
  }
}
