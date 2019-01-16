import {Component, OnInit} from '@angular/core';
import {Client} from '../../../models/client';
import {SelectionModel} from '@angular/cdk/collections';
import {AppService} from '../../../services/app.service';
import {NotificationService} from '../../../services/notification.service';
import {of as observableOf} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {ClientEntryComponent} from '../../../components/client-entry/client-entry.component';
import {ProjectEntryComponent} from '../../../components/project-entry/project-entry.component';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.scss']
})
export class AdminClientsComponent implements OnInit {
  public title = 'Clients & Projects';
  public clientSelectionModel = new SelectionModel<Client>(true, []);
  public clientDisplayedColumns = ['select', 'name'];
  public projectSelectionModel = new SelectionModel<Client>(true, []);
  public projectDisplayedColumns = ['select', 'name'];

  constructor(private appService: AppService, private notificationService: NotificationService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  retrieveRecords() {
    return this.appService.getClients(false)
      .pipe(
        catchError((err, caught): any => {
          this.notificationService.error('Failed to load clients');

          return observableOf([]);
        })
      );
  }

  addNewEntry(grid) {
    let component;

    if (grid.type === 'client') {
      component = ClientEntryComponent;
    } else {
      component = ProjectEntryComponent;
    }

    const dialogRef = this.dialog.open(component, {
      data: {
        title: 'Add new ' + grid.type,
        type: 'new',
        gridCmp: grid
      }
    });
  }
}
