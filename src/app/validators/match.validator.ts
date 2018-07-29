import {FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function matchValidator(fieldName: string): ValidatorFn {
  let fcfirst: FormControl;
  let fcSecond: FormControl;

  return function matchValidatorFn(control: FormControl): ValidationErrors | null {

    if (!control.parent) {
      return null;
    }

    // INITIALIZING THE VALIDATOR.
    if (!fcfirst) {
      // INITIALIZING FormControl first
      fcfirst = control;
      fcSecond = control.parent.get(fieldName) as FormControl;

      // FormControl Second
      if (!fcSecond) {
        throw new Error('matchValidator(): Second control is not found in the parent group!');
      }

      fcSecond.valueChanges.subscribe(() => {
        fcfirst.updateValueAndValidity();
      });
    }

    if (!fcSecond) {
      return null;
    }

    if (fcSecond.value !== fcfirst.value) {
      return {
        match: true
      };
    }

    return null;
  };
}
