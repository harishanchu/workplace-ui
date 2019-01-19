import {Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {NotificationService} from '../../../services/notification.service';
import {of as observableOf} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-admin-employees',
  templateUrl: './admin-employees.component.html',
  styleUrls: ['./admin-employees.component.scss']
})
export class AdminEmployeesComponent implements OnInit {
  public title = 'Employees';
  public userSelectionModel = new SelectionModel<User>(true, []);
  public userDisplayedColumns = ['select', 'name', 'email', 'roles'];
  public displayedColumnsProperties = {
    name: {
      sortable: true
    },
    email: {
      sortable: true
    },
    roles: {
      title: 'Is Admin',
      formatter: (role) => role && role[0] && role[0].name === 'admin' || ''
    }
  };

  constructor(private notificationService: NotificationService, private userService: UserService) {
  }

  ngOnInit() {
  }

  retrieveRecords(grid, options) {
    return this.userService.getUsers(true, options)
      .pipe(
        catchError((err, caught): any => {
          this.notificationService.error('Failed to load employees');

          return observableOf([]);
        })
      );
  }

  promoteAsAdmin(grid, id) {
    this.userService.promoteAsAdmin(id).subscribe(
      data => {
        this.notificationService.success('Promted user as Admin');
        grid.refreshGrid();
      },
      error => {
        this.notificationService.error(error.error.error.message);
      }
    );
  }
}
