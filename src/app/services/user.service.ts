import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(includeRoles = false, options: any = {}) {
    const params: any = {};
    const httpOptions: any = {};

    if (includeRoles) {
      params.filter = {include: 'roles'};
    }

    if (options.sort) {
      params.filter = {};
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

    return this.http.get('users', httpOptions).pipe(map(res => {
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

  promoteAsAdmin(userId) {
    return this.http.post(`users/${userId}/role`, {roleName: 'admin'});
  }
}
