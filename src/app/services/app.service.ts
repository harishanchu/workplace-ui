import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppService {
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

  constructor(private http: HttpClient) {
  }

  getClients(includeProjects = false) {
    const params: any = {};

    if (includeProjects) {
      params.filter = JSON.stringify({include: 'projects'});
    }

    return this.http.get('clients', {params}).map(res => {
      return res;
    });
  }

  getProjects() {
    return this.http.get('projects').map(res => {
      return res;
    });
  }
}
