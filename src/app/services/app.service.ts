import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserStats} from '../models/UserStats';
import {Observable} from 'rxjs/Rx';
import {Client} from '../models/client';
import {Project} from '../models/project';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {
  }

  static get clientAllItem(): any {
    return {
      id: 'all',
      name: 'All'
    };
  }

  static get projectAllItem(): any {
    return {
      id: 'all',
      name: 'All'
    };
  }

  getClientConfig() {
    return this.http.get('config');
  }

  getClients(includeProjects = false, options: any = {}) {
    const params: any = {};
    const httpOptions: any = {};

    if (includeProjects) {
      params.filter = {include: 'projects'};
    }

    if (options.sort) {
      params.filter = params.filter || {};
      params.filter.order = [options.sort + ' ' + options.sortDirection, 'id asc'];
    }

    if (options.pageIndex !== undefined) {
      params.filter = params.filter || {};
      params.filter.skip = options.pageIndex * options.pageSize;
      params.filter.limit = options.pageSize;
      httpOptions.observe = 'response';
    }

    if (params.filter) {
      params.filter = JSON.stringify(params.filter);
    }

    httpOptions.params = params;

    return this.http.get('clients', httpOptions).pipe(map((res: any) => {
      if (options.pageIndex !== undefined) {
        return {
          items: res.body,
          total: res.headers.get('x-total-count') || 0
        };
      } else {
        return res;
      }
    }));
  }

  getProjects(includeClients = false, options: any = {}) {
    const params: any = {};
    const httpOptions: any = {};

    if (includeClients) {
      params.filter = {include: 'client'};
    }

    if (options.sort) {
      params.filter = params.filter || {};
      params.filter.order = [options.sort + ' ' + options.sortDirection, 'id asc'];
    }

    if (options.pageIndex !== undefined) {
      params.filter = params.filter || {};
      params.filter.skip = options.pageIndex * options.pageSize;
      params.filter.limit = options.pageSize;
      httpOptions.observe = 'response';
    }

    if (params.filter) {
      params.filter = JSON.stringify(params.filter);
    }

    httpOptions.params = params;

    return this.http.get('projects', httpOptions).pipe(map((res: any) => {
      if (options.pageIndex !== undefined) {
        return {
          items: res.body,
          total: res.headers.get('x-total-count') || 0
        };
      } else {
        return res;
      }
    }));
  }

  getTaskTypes() {
    return this.http.get('tasks/types').pipe(map(res => {
      return res;
    }));
  }

  getUserStats(userId): Observable<UserStats> {
    return this.http.get(`users/${userId}/stats`);
  }

  createClient(client: Client) {
    return this.http.post(`clients`, client);
  }

  updateClient(id, client: Client) {
    return this.http.patch(`clients/${id}`, client);
  }

  deleteClient(client) {
    if (client.length === 1) {
      return this.http.delete(`clients/${client[0].id}`);
    } else {
      return this.http.request('delete', 'clients', {body: {id: client.map(clientItem => clientItem.id)}});
    }
  }

  createProject(project: Project) {
    return this.http.post(`projects`, project);
  }

  updateProject(id, project: Project) {
    return this.http.patch(`projects/${id}`, project);
  }

  deleteProject(project) {
    if (project.length === 1) {
      return this.http.delete(`projects/${project[0].id}`);
    } else {
      return this.http.request('delete', 'projects', {body: {id: project.map(projectItem => projectItem.id)}});
    }
  }
}
