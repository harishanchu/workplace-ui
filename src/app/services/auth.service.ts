import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Storage} from '../helpers/storage';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

// import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn;
  private store = new Storage();
  private authStorageKey = 'auth';


  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(private http: HttpClient) {
    this.loggedIn = new BehaviorSubject<boolean>(this.isvalidAuthDataPresent());
  }

  isvalidAuthDataPresent() {
    const authData = this.getAuthData();

    if(
      authData.created && authData.ttl &&
      (Date.parse(authData.created) + authData.ttl*1000) < Date.now()
    ) {
      authData = {};
    }

    return !!authData.accessToken;
  }

  /**
   * Store authentication information to local storage.
   */
  setAuthData(authObj) {
    this.store.set(this.authStorageKey, authObj);
    this.loggedIn.next(true);
  }

  /**
   * Delete authentication information from storage.
   */
  clearAuthData() {
    this.store.remove(this.authStorageKey);
    this.loggedIn.next(false);
  }


  attemptAuth(creds: { email: string, password: string }): Observable<any> {
    return this.http.post('users/login', creds).map(resp => {
        // Save token
        this.setAuthData(resp);

        return true;
      }
    );
  }

  logout() {
    return this.http.delete('users/logout').map(res => {
        // clear token from store
        this.clearAuthData();
      }
    );
  }

  register(user) {
    return this.http.post('users', user).map(response => {
        return response;
      }
    );
  }

  getAuthData() {
    return this.store.get(this.authStorageKey) || {};
  }


  getAuthToken() {
    return this.getAuthData().accessToken || null;
  }

  getAuthUserId() {
    return this.getAuthData().user.id;
  }

  isAdmin() {
    return (this.getAuthData().user.roles).indexOf('admin') > -1;
  }

  getUserEmail() {
    return this.getAuthData().user.email;
  }

  getUserName() {
    return this.getAuthData().user.name;
  }
}
