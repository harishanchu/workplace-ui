import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Validators} from '../../helpers/Validators';
import {ValidationMixin} from '../../mixins/validation.mixin';
import {Profile} from '../../models/Profile';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends ValidationMixin implements OnInit {
  public form: FormGroup;
  public genders = [
    {
      id: 'm',
      name: 'Male'
    },
    {
      id: 'f',
      name: 'Female'
    },
    {
      id: 'o',
      name: 'Other'
    }
  ];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private notificationService: NotificationService) {
    super();
    this.form = fb.group({
      'name': ['', [Validators.required, Validators.min(3), Validators.max(30)]],
      'email': [''],
      'dob': ['', Validators.date],
      'gender': ['']
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
      dob: user['dob'],
      gender: user['gender']
    });
  }

  onSaveProfileClick() {
    if (this.form.valid) {
      const formValues = this.form.value;
      const profile: Profile = {
        name: formValues.name,
        dob: null,
        gender: formValues.gender
      };

      if (formValues.dob instanceof Date) {
        const temp = formValues.dob.toLocaleDateString('en-us').split('/'); // mm/dd/yyyy

        profile.dob = [temp[2], temp[0], temp[1]].join('-');
      } else if (typeof formValues.dob === 'string') {
        profile.dob = formValues.dob.substr(0, 10);
      }

      this.updateProfile(profile);
    }
  }

  updateProfile(profile: Profile) {
    this.authService.updateProfile(profile).subscribe(
      data => {
        this.notificationService.success('User profile updated successfully.');
      },
      error => {
        this.notificationService.error(error.error.error.message);
      }
    );
  }

  cancelProfileChanges() {
    this.loadForm();
  }
}
