import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Globals} from '../../../globals';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ValidationMixin} from '../../../mixins/index';
import {Util} from '../../../helpers/util';
import {matchValidator} from '../../../validators/index';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private form: FormGroup;
  private loading = false;

  constructor(private router: Router, private globals: Globals,
              private authService: AuthService, private fb: FormBuilder,
              private notificationService: NotificationService) {
    this.form = fb.group({
      'name': ['', [Validators.required, Validators.min(3), Validators.max(30)]],
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
      const user = Object.assign({}, this.form.value);
      delete user.confirmPassword;


      this.authService.register(user).subscribe(
        data => {
          this.notificationService.error('Registration successful. Please verify your email to login', '', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.notificationService.error(error.error.error.message);
          this.loading = false;
        }
      );
    }
  }

}

Util.mixin(RegisterComponent, [ValidationMixin]);
