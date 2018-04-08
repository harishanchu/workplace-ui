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

  constructor(http: HttpClient) {
  }

  getAuthData() {
    return this.store.get(this.authStorageKey) || {};
  }

  getAuthToken() {
    return this.getAuthData().token || null;
  }


  attemptAuth(email: string, password: string)/*: Observable*/ {

   /* return this.http.post('users', arguments).map(user => {

    });*/
    // if (user.userName !== '' && user.password != '' ) { // {3}
    this.loggedIn.next(true);
    // }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
  }

  register(user) {
  }
}
