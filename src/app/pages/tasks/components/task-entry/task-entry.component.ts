import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TaskService} from '../../../../services/task.service';
import {NotificationService} from '../../../../services/notification.service';
import {AppService} from '../../../../services/app.service';
import {ValidationMixin} from '../../../../mixins/validation.mixin';
import {Task} from '../../../../models/task';

@Component({
  selector: 'app-task-entry',
  templateUrl: './task-entry.component.html',
  styleUrls: ['./task-entry.component.scss']
})
export class TaskEntryComponent extends ValidationMixin implements OnInit {
  public title;
  public form: FormGroup;
  public clients = <any>[];
  public projects = <any>[];
  public taskTypes = <any>[];
  private editFormData;
  private gridCmp;
  private type: string;
  private projectsUnfiltered = <any>[];

  constructor(public dialogRef: MatDialogRef<TaskEntryComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private fb: FormBuilder,
              private taskService: TaskService,
              private notificationService: NotificationService,
              private appService: AppService) {
    super();
    this.title = data.title;
    this.type = data.type;
    this.gridCmp = data.gridCmp;
    this.form = fb.group({
      'type': ['', Validators.required],
      'description': ['', Validators.required],
      'projectId': ['', Validators.required],
      'clientId': ['', Validators.required]
    });

    this.editFormData = this.data.formData;
    this.loadDataToForm(this.editFormData);
  }

  ngOnInit() {
    this.appService.getClients(false).subscribe(clients => {
      this.clients = clients;
    });
    this.appService.getTaskTypes().subscribe(types => {
      this.taskTypes = types;
      if (!this.form.controls['type'].value) {
        this.form.controls['type'].setValue(types[0]);
      }
    });

    this.loadComboStores();
  }

  loadComboStores() {
    this.appService.getProjects().subscribe(projects => {
      this.projectsUnfiltered = projects;

      /**
       * If client is already selected filter projects list
       * (In case of edit client will be loaded already).
       */
      this.populateProjectsBasedOnClient();
    });
  }

  populateProjectsBasedOnClient() {
    const clientId = this.form.controls.clientId.value;

    if (clientId) {
      this.projects = this.projectsUnfiltered.filter(function (project) {
        return project.clientId === clientId;
      });
    }
  }

  loadDataToForm(data) {
    this.form.setValue({
      projectId: data.projectId,
      description: data.description,
      clientId: data.clientId,
      type: data.type
    });
  }

  onSaveClick(): void {
    if (this.form.valid) {
      const formValues = this.form.value;
      const task: Task = {
        description: formValues.description,
        type: formValues.type,
        projectId: formValues.projectId
      };
      this.updateTask(task);
    }
  }

  updateTask(task: Task) {
    // Update time sheet;
    this.taskService.updateTask(this.editFormData.id, <Task>task).subscribe(
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
