import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-clients-grid',
  templateUrl: './clients-grid.component.html',
  styleUrls: ['./clients-grid.component.scss']
})
export class ClientsGridComponent implements OnInit {
  public displayedColumns = ['sl.no', 'name'];
  private displayedColumnsTitles = {};
  public defaultSort = 'name';
  public dataSource = new MatTableDataSource();
  private selection = new SelectionModel(true, []);
  public loading = false;
  private date;
  public enablePagination = true;
  @ViewChild('table') private table;

  constructor() {
  }

  ngOnInit() {
  }

}
