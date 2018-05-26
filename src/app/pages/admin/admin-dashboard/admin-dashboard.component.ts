import {Component, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import {ChartEvent, ChartType} from 'ng-chartist';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  private hoursChart = <Chart>{
    type: 'Line',
    data: {
      'labels': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'series': [
        [12, 9, 7, 8, 5]
      ]
    }
  };

  private resourceAllocationChart = <Chart>{
    type: 'Line',
    data: {
      'labels': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'series': [
        [2, 1, 3.5, 7, 3]
      ]
    }
  };

  private tasksChart = <Chart>{
    type: 'Line',
    data: {
      'labels': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'series': [
        [1, 3, 4, 5, 6]
      ]
    }
  };

  constructor() {
  }

  ngOnInit() {
  }

}
