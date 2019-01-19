import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NotificationService} from '../../services/notification.service';
import {AppService} from '../../services/app.service';
import {Validators} from '../../helpers/Validators';
import {ValidationMixin} from '../../mixins/validation.mixin';
import {Project} from '../../models/project';

@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.scss']
})
export class ProjectEntryComponent extends ValidationMixin implements OnInit {
  public title;
  public form: FormGroup;
  private editFormData;
  private gridCmp;
  private type: string;
  public clients = <any>[];

  constructor(public dialogRef: MatDialogRef<ProjectEntryComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              private appService: AppService,
              public dialog: MatDialog) {
    super();
    this.title = data.title;
    this.type = data.type;
    this.gridCmp = data.gridCmp;
    this.clients = data.clients;
    this.form = fb.group({
      'clientId': ['', Validators.required],
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
      clientId: data.clientId,
      name: data.name
    });
  }

  public onSaveFormClick(): void {
    if (this.form.valid) {
      const formValues = this.form.value;
      const project: Project = {
        name: formValues.name,
        clientId: formValues.clientId
      };


      if (this.type === 'new') {
        this.create(project);
      } else {
        this.update(project);
      }
    }
  }

  create(project: Project) {
    this.appService.createProject(<Project>project).subscribe(
      data => {
        this.gridCmp.appendItem(data);
        this.dialogRef.close();
      },
      error => {
        this.notificationService.error(error.error.error.message);
      }
    );
  }

  update(project: Project) {
    this.appService.updateProject(this.editFormData.id, <Project>project).subscribe(
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
