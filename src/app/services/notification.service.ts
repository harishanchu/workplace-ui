import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class NotificationService {
  private keepAfterNavigationChange = false;

  constructor(private router: Router, private snackBar: MatSnackBar) {
    this.registerEvents();
  }

  registerEvents() {
    // dismiss snackbar on route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // dismiss snackbar
          this.snackBar.dismiss();
        }
      }
    });
  }

  notify(message: { text: string, type: string } = {
           text: '',
           type: 'success'
         },
         action: string, keepAfterNavigationChange = false, snackConfig?) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    snackConfig = Object.assign({
      duration: 8000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom'
    }, snackConfig);

    return this.snackBar.open(message.text, '', snackConfig);
  }

  success(message: string, action = '', keepAfterNavigationChange = false) {
    return this.notify({type: 'success', text: message}, action, keepAfterNavigationChange, {});
  }

  error(message: string, action = '', keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    return this.notify({type: 'error', text: message}, action, keepAfterNavigationChange, {});
  }
}
