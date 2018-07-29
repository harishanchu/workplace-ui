import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Storage} from '../helpers/storage';
import {HttpClient} from '@angular/common/http';

// import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn;
  private store = new Storage();
  private authStorageKey = 'auth';

  constructor(private http: HttpClient) {
    this.loggedIn = new BehaviorSubject<boolean>(this.isvalidAuthDataPresent());
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  isvalidAuthDataPresent() {
    let authData = this.getAuthData();

    if (
      authData.created && authData.ttl &&
      (Date.parse(authData.created) + authData.ttl * 1000) < Date.now()
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
    return this.http.post('users/login', creds).pipe(map(resp => {
        // Save token
        this.setAuthData(resp);

        return true;
      }
    ));
  }

  logout() {
    return this.http.delete('users/logout').pipe(map(res => {
        // clear token from store
        this.clearAuthData();
      }
    ));
  }

  register(user) {
    return this.http.post('users', user).pipe(map(response => {
        return response;
      }
    ));
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

  setUserPreference(key, value) {
    const authData = this.getAuthData();

    authData.userPreference = authData.userPreference || {};
    authData.userPreference[key] = value;

    this.setAuthData(authData);
  }

  getUserPreference(key) {
    const authData = this.getAuthData();

    authData.userPreference = authData.userPreference || {};

    return authData.userPreference[key];
  }
}
