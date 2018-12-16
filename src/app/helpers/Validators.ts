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
    const ptDatePattern = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;

    if (control.value && !((control.value instanceof Date)
        || control.value.match(ptDatePattern))
    ) {
      return {'date': true};
    } else {
      return null;
    }
  }
}
