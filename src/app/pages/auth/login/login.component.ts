import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Globals} from '../../../globals';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ValidationMixin} from '../../../mixins/index';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ValidationMixin implements OnInit {
  public form: FormGroup;
  public loading = false;
  private returnUrl: string;

  constructor(private router: Router, private route: ActivatedRoute, public globals: Globals,
              private authService: AuthService, private fb: FormBuilder,
              private notificationService: NotificationService) {
    super();
    this.form = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (this.form.valid) {
      this.loading = true;

      this.authService.attemptAuth(this.form.value).subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.notificationService.error(error.error.error.message);
          this.loading = false;
        }
      );
      // self.router.navigate(['/']);
    }
  }
}
