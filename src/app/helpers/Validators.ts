/**
 * Validator.js
 *
 * @author: Harish Anchu <harishanchu@gmail.com>
 * @copyright Copyright (c) 2018, Harish Anchu.
 * @license See LICENSE
 */

import {FormControl, Validators as ngValidators} from '@angular/forms';

export class Validators extends ngValidators {
  static date(control: FormControl): { [key: string]: any } {
    const ptDatePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (control.value && !((control.value instanceof Date)
        || control.value.substr(0, 10).match(ptDatePattern))
    ) {
      return {'date': true};
    } else {
      return null;
    }
  }
}
