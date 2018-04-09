import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Storage} from '../helpers/storage';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

// import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  private store = new Storage();
  private authStorageKey = 'auth';


  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(private http: HttpClient) {
  }

  getAuthData() {
    return this.store.get(this.authStorageKey) || {};
  }

  getAuthToken() {
    return this.getAuthData().token || null;
  }


  attemptAuth(creds: { email: string, password: string }): Observable<any> {
    return this.http.post('users/login', creds).map(user => {
        // Save token

        debugger;
        this.loggedIn.next(true);

        return true;
      }
    );
  }

  logout() {
    return this.http.post('users/logout', null).map(res => {
        // clear token from store

      
        this.loggedIn.next(false);
      }
    );
  }

  register(user) {
    return this.http.post('users', user).map(response => {
        return response;
      }
    );
  }
}
