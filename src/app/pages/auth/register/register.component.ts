import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Globals} from '../../../globals';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ValidationMixin} from '../../../mixins/index';
import {Util} from '../../../helpers/util';
import {matchValidator} from '../../../validators/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private form: FormGroup;
  private loading = false;

  constructor(private router: Router, private globals: Globals,
              private authService: AuthService, private fb: FormBuilder) {
    this.form = fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', [Validators.minLength(6), Validators.required]],
      'confirmPassword': ['', [Validators.required, matchValidator('password')]]
    });
  }

  ngOnInit() {
  }

  register() {
    if (this.form.valid) {
      this.loading = true;
      const self = this;

      this.authService.register(this.form.value);
    }
  }

}

Util.mixin(RegisterComponent, [ValidationMixin]);
