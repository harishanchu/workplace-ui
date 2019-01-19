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
import {ConfirmComponent} from '../../../components/confirm/confirm.component';

@Component({
  selector: 'app-admin-clients-and-projects',
  templateUrl: './admin-clients-and-projects.component.html',
  styleUrls: ['./admin-clients-and-projects.component.scss']
})
export class AdminClientsAndProjectsComponent implements OnInit {
  public title = 'Clients & Projects';
  public clientSelectionModel = new SelectionModel<Client>(true, []);
  public clientDisplayedColumns = ['select', 'name'];
  public clientDisplayedColumnsProperties = {
    'name': {
      sortable: true
    }
  };
  public projectSelectionModel = new SelectionModel<Client>(true, []);
  public projectDisplayedColumns = ['select', 'name', 'client'];
  public projectDisplayedColumnsProperties = {
    'name': {
      sortable: true
    },
    'client': {
      sortable: true,
      sortField: 'client.name',
      formatter: (client: Client) => client && client.name || ''
    }
  };

  constructor(private appService: AppService, private notificationService: NotificationService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  retrieveRecords(grid, options) {
    const type = grid.type;
    const args = [options];

    if (type === 'project') {
      args.unshift(true);
    } else {
      args.unshift(false);
    }

    return this.appService[`get${type[0].toUpperCase()}${type.substr(1)}s`](...args)
      .pipe(
        catchError((err, caught): any => {
          this.notificationService.error(`Failed to load ${type}s`);

          return observableOf([]);
        })
      );
  }

  addEntry(grid, clients = false) {
    let component;
    let dialogData: any = {
      title: 'Add new ' + grid.type,
      type: 'new',
      gridCmp: grid
    };

    if (grid.type === 'client') {
      component = ClientEntryComponent;
    } else {
      component = ProjectEntryComponent;
      dialogData.clients = clients;
    }

    const dialogRef = this.dialog.open(component, {
      data: dialogData
    });
  }

  editEntry(grid, data, clients = false) {
    let component;
    let dialogData: any = {
      title: 'Edit ' + grid.type,
      type: 'update',
      gridCmp: grid,
      formData: data
    };

    if (grid.type === 'client') {
      component = ClientEntryComponent;
    } else {
      component = ProjectEntryComponent;
      dialogData.clients = clients;
    }

    const dialogRef = this.dialog.open(component, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
      }
    });
  }

  deleteEntry(grid, client) {
    if (client.length > 1) {
      this.confirmDeleteEntry(grid.type, confirm => {
        if (confirm) {
          this.doDeleteEntry(grid, client);
        }
      });
    } else {
      this.doDeleteEntry(grid, client);
    }
  }

  confirmDeleteEntry(type, callback) {
    this.dialog.open(ConfirmComponent, {
      data: {
        title: `Delete ${type}`,
        message: `Do you wish to delete multiple ${type}s at once?`
      }
    }).afterClosed().subscribe(callback);
  }

  doDeleteEntry(grid, items) {
    const type = grid.type;

    this.appService[`delete${type[0].toUpperCase()}${type.substr(1)}`](items).subscribe(
      data => {
        grid.refreshGrid();
      },
      error => {
        this.notificationService.error(error.error.error.message);
      }
    );
  }
}
