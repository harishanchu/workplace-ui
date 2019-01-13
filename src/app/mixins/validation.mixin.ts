export class ValidationMixin {
  static getErrorMessage(validator, validationResponse, field) {
    let message = '';

    switch (validator) {
      case 'required':
        message = 'You can\'t leave this empty';
        break;

      case 'match':
        if (field === 'confirmPassword') {
          message = 'Passwords don\'t match';
        } else {
          message = 'This field don\'t match';
        }
        break;

      case 'minlength':
        if (field === 'password') {
          message = `Short passwords are easy to guess. Try one with at least ${validationResponse.requiredLength} characters.`;
        } else {
          message = `Minimum ${validationResponse.requiredLength} characters required)`;
        }
        break;

      default:
        message = 'Please enter a valid value';
    }

    return message;
  }

  getForm(form = 'form') {
    return this[form];
  }

  hasError(field, form = 'form') {
    const control = this.getForm(form).controls[field];
    let message = '';

    if (control.errors) {
      const key = Object.keys(control.errors)[0];

      message = this.constructor['getErrorMessage'](key, control.errors[key], field);
    }

    return message;
  }
}
