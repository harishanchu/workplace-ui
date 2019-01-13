import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

@Injectable()
export class Globals {
  appName = 'Workplace';
  maxWorkHoursPerWeek = 0;
  baseApiUrl: string

  constructor() {
    this.baseApiUrl = environment.baseApiUrl;
  }
}
