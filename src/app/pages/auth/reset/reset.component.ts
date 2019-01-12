import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Globals} from '../../../globals';
import {AuthService} from '../../../services/auth.service';
import {NotificationService} from '../../../services/notification.service';
import {Validators} from '../../../helpers/Validators';
import {ForgotComponent} from '../forgot/forgot.component';
import {Util} from '../../../helpers/util';
import {ValidationMixin} from '../../../mixins/validation.mixin';
import {matchValidator} from '../../../validators/match.validator';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  private form: FormGroup;
  private loading = false;
  private returnUrl = '/login';
  private token: string;

  constructor(private router: Router, private route: ActivatedRoute, private globals: Globals,
              private authService: AuthService, private fb: FormBuilder,
              private notificationService: NotificationService) {
    this.form = fb.group({
      'password': ['', [Validators.minLength(6), Validators.required]],
      'confirmPassword': ['', [Validators.required, matchValidator('password')]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  reset() {
    if (this.form.valid) {
      this.loading = true;

      this.authService.resetPassword(this.form.value.password, this.token).subscribe(
        data => {
          this.notificationService.success('Your account password has been updated. Please login to continue.', '', true);
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

Util.mixin(ResetComponent, [ValidationMixin]);
