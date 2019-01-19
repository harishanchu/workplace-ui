import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NotificationService} from '../../services/notification.service';
import {AppService} from '../../services/app.service';
import {ValidationMixin} from '../../mixins/validation.mixin';
import {Validators} from '../../helpers/Validators';
import {Client} from '../../models/client';

@Component({
  selector: 'app-client-entry',
  templateUrl: './client-entry.component.html',
  styleUrls: ['./client-entry.component.scss']
})
export class ClientEntryComponent extends ValidationMixin implements OnInit {
  public title;
  public form: FormGroup;
  private editFormData;
  private gridCmp;
  private type: string;

  constructor(public dialogRef: MatDialogRef<ClientEntryComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              private appService: AppService,
              public dialog: MatDialog) {
    super();
    this.title = data.title;
    this.type = data.type;
    this.gridCmp = data.gridCmp;
    this.form = fb.group({
      'name': ['', [Validators.required, Validators.min(3), Validators.max(20)]]
    });

    if (this.type === 'update') {
      this.editFormData = this.data.formData;
      this.loadExistingDataToForm(this.editFormData);
    }
  }

  ngOnInit() {
  }

  loadExistingDataToForm(data) {
    this.form.setValue({
      name: data.name
    });
  }

  public onSaveFormClick(): void {
    if (this.form.valid) {
      const formValues = this.form.value;
      const client: Client = {
        name: formValues.name
      };


      if (this.type === 'new') {
        this.create(client);
      } else {
        this.update(client);
      }
    }
  }

  create(client: Client) {
    this.appService.createClient(<Client>client).subscribe(
      data => {
        this.gridCmp.appendItem(data);
        this.dialogRef.close();
      },
      error => {
        this.notificationService.error(error.error.error.message);
      }
    );
  }

  update(client: Client) {
    this.appService.updateClient(this.editFormData.id, <Client>client).subscribe(
      data => {
        this.gridCmp.updateItem(this.editFormData, data);
        this.dialogRef.close();
      },
      error => {
        this.notificationService.error(error.error.error.message);
      }
    );
  }
}
