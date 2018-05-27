import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-clients-grid',
  templateUrl: './clients-grid.component.html',
  styleUrls: ['./clients-grid.component.scss']
})
export class ClientsGridComponent implements OnInit {
  private displayedColumns = ['sl.no', 'name'];
  private displayedColumnsTitles = {};
  private defaultSort = 'name';
  private dataSource = new MatTableDataSource();
  private selection = new SelectionModel(true, []);
  private loading = false;
  private date;
  private enablePagination = true;
  @ViewChild('table') private table;

  constructor() { }

  ngOnInit() {
  }

}
