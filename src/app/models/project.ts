import {Client} from './client';

export interface Project {
  id?: any;
  clientId: any;
  name: string;
  client?: Client;
}
