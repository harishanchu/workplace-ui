import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

// import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor() {
  }

  login(/*user: User*/) {
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
