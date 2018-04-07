import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Globals} from '../../../globals';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ValidationService} from '../../../services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private form: FormGroup;
  private returnUrl: string;
  private loading = false;
  private formControl = new FormControl('', [Validators.required]);

  constructor(private route: ActivatedRoute, private router: Router,
              private globals: Globals, private authService: AuthService,
              private fb: FormBuilder, private validationService: ValidationService) {
    this.form = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.form.valid) {
      this.loading = true;
      const self = this;

      setTimeout(function () {
        self.authService.login();
      }, 2000);
    }
  }

  hasError(field) {
    const control = this.form.controls[field];
    let message = '';

    if (control.touched && control.errors) {
      message = ValidationService.getMessage(Object.keys(control.errors)[0]);
    }

    return message;
  }
}
