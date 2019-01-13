import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from '../../../services/notification.service';
import {TimeSheetService} from '../../../services/time-sheet.service';
import {MatDatepickerInputEvent} from '@angular/material';
import {FormBuilder, Validators} from '@angular/forms';
import {AppService} from '../../../services/app.service';
import {Util} from '../../../helpers/util';

@Component({
  selector: 'app-admin-time-sheets',
  templateUrl: './admin-time-sheets.component.html',
  styleUrls: ['../../time-sheets/time-sheets.component.scss', './admin-time-sheets.component.scss']
})
export class AdminTimeSheetsComponent implements OnInit, AfterViewInit {
  public title: string;
  public form;
  public clients = <any>[];
  public projects = <any>[];
  private projectsUnfiltered = <any>[];
  @ViewChild('timeSheetGrid') public grid;
  public maxDate: Date = new Date();

  constructor(private timeSheetService: TimeSheetService,
              private notificationService: NotificationService,
              private fb: FormBuilder,
              private appService: AppService) {
    this.title = 'Time Sheets';
    this.form = fb.group({
      'fromDate': [new Date(), Validators.required],
      'toDate': [new Date(), Validators.required],
      'clientId': [['all'], Validators.required],
      'projectId': [['all'], Validators.required]
    });
  }

  ngOnInit() {
    this.loadComboStores();
  }

  ngAfterViewInit() {
    this.refreshGrid();
  }

  loadComboStores() {
    this.appService.getClients(false).subscribe(clients => {
      this.clients = [AppService.clientAllItem].concat(clients);
      this.appService.getProjects().subscribe(projects => {
        this.projectsUnfiltered = [AppService.projectAllItem].concat(projects);

        /**
         * If client is already selected filter projects list
         * (In case of edit client will be loaded already).
         */
        this.populateProjectsBasedOnClient();
      }, error => {
        this.notificationService.error('Failed to load projects');
      });
    }, error => {
      this.notificationService.error('Failed to load clients');
    });
  }

  populateProjectsBasedOnClient() {
    const clientId = this.form.controls.clientId.value;

    if (clientId[0] !== 'all') {
      this.projects = this.projectsUnfiltered.filter(function (project) {
        return project.id === 'all' || clientId.indexOf(project.clientId) > -1;
      });
    } else {
      this.projects = this.projectsUnfiltered;
    }
  }

  onDatePick(event: MatDatepickerInputEvent<Date>) {
    this.refreshGrid();
  }

  exportTimeSheets(advanced = false) {
    this.grid.export(advanced);
  }

  refreshGrid() {
    this.grid.loadTimeSheet(this.form.value);
  }

  onClientIdChange(event) {
    const selectionModel = event.source._selectionModel;
    const clientIdFormControl = this.form.get('clientId');

    Util.handleMultiSelectWithAllOptionChange(clientIdFormControl, selectionModel);
    this.populateProjectsBasedOnClient();

    this.refreshGrid();
  }

  onProjectIdChange(event) {
    const selectionModel = event.source._selectionModel;
    const projectIdFormControl = this.form.get('projectId');

    Util.handleMultiSelectWithAllOptionChange(projectIdFormControl, selectionModel);

    this.refreshGrid();
  }
}
