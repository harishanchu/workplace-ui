import {Injectable} from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() {
  }

  static getMessage(validator) {
    let message = '';

    switch (validator) {
      case 'required':
        message = 'This field is required';
        break;
    }

    return message;
  }

}
