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

  retrieveRecords(grid) {
    const type = grid.type;

    return this.appService[`get${type[0].toUpperCase()}${type.substr(1)}s`](false)
      .pipe(
        catchError((err, caught): any => {
          this.notificationService.error(`Failed to load ${type}s`);

          return observableOf([]);
        })
      );
  }

  addEntry(grid) {
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

  editEntry(grid, client) {
    let component;

    if (grid.type === 'client') {
      component = ClientEntryComponent;
    } else {
      component = ProjectEntryComponent;
    }

    const dialogRef = this.dialog.open(component, {
      data: {
        title: 'Edit ' + grid.type,
        type: 'update',
        gridCmp: grid,
        formData: client
      }
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
