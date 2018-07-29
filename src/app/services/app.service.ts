import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

  getClients(includeProjects = false) {
    const params: any = {};

    if (includeProjects) {
      params.filter = JSON.stringify({include: 'projects'});
    }

    return this.http.get('clients', {params}).pipe(map(res => {
      return res;
    }));
  }

  getProjects() {
    return this.http.get('projects').pipe(map(res => {
      return res;
    }));
  }
}
