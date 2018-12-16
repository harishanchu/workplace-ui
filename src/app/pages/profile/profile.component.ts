import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Validators} from '../../helpers/Validators';
import {ValidationMixin} from '../../mixins/validation.mixin';
import {Util} from '../../helpers/util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = fb.group({
      'name': ['', [Validators.required, Validators.min(3), Validators.max(30)]],
      'email': [''],
      'dob': ['', Validators.date]
    });
    this.loadForm();
  }

  ngOnInit() {
  }

  loadForm() {
    const user = this.authService.getUserDetails();

    this.form.setValue({
      name: user['name'],
      email: user['email'],
      dob: user['dob']
    });
  }

  onSaveProfileClick() {

  }

  cancelProfileChanges() {
    this.loadForm();
  }
}

Util.mixin(ProfileComponent, [ValidationMixin]);
