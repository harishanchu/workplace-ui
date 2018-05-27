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
  private title = 'Dashboard';
  private hoursChart = <Chart> {
    type: 'Line',
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      // low: 0,
      // high: 50,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    },
    data: {
      'labels': ['M', 'T', 'W', 'T', 'F'],
      'series': [
        [12, 9, 7, 8, 5]
      ]
    }
  };

  private resourceAllocationChart = <Chart> {
    data: {
      series: [20, 10, 30, 40]
    },
    options: {
      donut: true,
      donutWidth: 40,
      donutSolid: true,
      startAngle: 270,
      showLabel: true
    },
    type: 'Pie'
  };

  private tasksChart = <Chart> {
    type: 'Line',
    data: {
      'labels': ['M', 'T', 'W', 'T', 'F'],
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
