import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Globals} from '../../../globals';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ValidationMixin} from '../../../mixins/index';
import {Util} from '../../../helpers/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private form: FormGroup;
  private loading = false;

  constructor(private router: Router, private globals: Globals,
              private authService: AuthService, private fb: FormBuilder) {
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
        self.authService.attemptAuth();
        self.router.navigate(['/']);
      }, 2000);
    }
  }
}

Util.mixin(LoginComponent, [ValidationMixin]);
