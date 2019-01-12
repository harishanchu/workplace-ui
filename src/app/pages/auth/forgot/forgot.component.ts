import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Globals} from '../../../globals';
import {AuthService} from '../../../services/auth.service';
import {NotificationService} from '../../../services/notification.service';
import {Validators} from '../../../helpers/Validators';
import {Util} from '../../../helpers/util';
import {ValidationMixin} from '../../../mixins/validation.mixin';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  private form: FormGroup;
  private loading = false;
  private returnUrl = '/login';

  constructor(private router: Router, private globals: Globals,
              private authService: AuthService, private fb: FormBuilder,
              private notificationService: NotificationService) {
    this.form = fb.group({
      'email': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  forgot() {
    if (this.form.valid) {
      this.loading = true;

      this.authService.forgotPassword(this.form.value.email).subscribe(
        data => {
          this.notificationService.success('We have sent you an email with reset link.', '', true);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.notificationService.error(error.error.error.message);
          this.loading = false;
        }
      );
    }
  }
}

Util.mixin(ForgotComponent, [ValidationMixin]);
