import {map, tap} from 'rxjs/operators';
import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Storage} from '../helpers/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Profile} from '../models/Profile';

// import { User } from './user';

@Injectable()
export class AuthService {
  public profileChange$ = new EventEmitter();
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

  forgotPassword(email): Observable<any> {
    return this.http.post('users/reset', {email});
  }

  resetPassword(password, token): Observable<any> {
    return this.http.put('users/reset-password', {newPassword: password}, {
      headers: new HttpHeaders().set('Authorization', token),
    });
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

  getUserDetails() {
    return this.getAuthData().user;
  }

  setUserDetails(user) {
    const authData = this.getAuthData();
    const roles = authData.user.roles;

    authData.user = user;
    user.roles = roles;

    this.setAuthData(authData);
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

  updateProfile(profile: Profile) {
    const self = this;
    return this.http.patch('users/me', profile).pipe(map(response => {
        return response;
      }
    )).pipe(tap((response) => {
      self.setUserDetails(response);
      self.profileChange$.emit(self.getUserDetails());
    }));
  }
}
