import {Component, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import {ChartEvent, ChartType} from 'ng-chartist';
import {AppService} from '../../services/app.service';
import {UserStats} from '../../models/UserStats';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-dsashboard',
  templateUrl: './dsashboard.component.html',
  styleUrls: ['./dsashboard.component.scss']
})
export class DsashboardComponent implements OnInit {
  private title = 'Dashboard';
  private loading = false;
  private stats = {} as UserStats;
  private hoursChartCaption: string;
  private hoursChart = <Chart> {
    type: 'Line',
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      // low: 0,
      // high: 50,
      chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
    },
    data: {
      'labels': ['M', 'T', 'W', 'T', 'F'],
      'series': [
        [0, 0, 0, 0, 0]
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
      'labels': [],
      'series': []
    }
  };

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;

    this.appService.getUserStats('me')
      .subscribe(
        stats => {
          this.stats = stats;
          this.refreshChartData();
        },
        err => {
        },
        () => {
          this.loading = false;
        }
      );
  }

  refreshChartData() {
    this.refreshHoursChart();
  }

  refreshHoursChart () {
    const labels = [];
    const series = [];
    let caption;
    const list = this.stats.DailyDurationForLast7Days;
    const length = list.length;

    list.forEach(item => {
      labels.push(item.day.substr(0, 1).toUpperCase());
      series.push((item.duration / 60));
    });

    this.hoursChart.data.labels = labels;
    this.hoursChart.data.series = [series];

    let d1 = series[length - 2];
    let d2 = series[length - 1];

    if (d2 - d1 > 1) {
      caption = `<span class="text-success">
${((d2 - d1) / d1 * 100).toFixed(2)}%
</span> increase in ${list[length - 1].day.toLowerCase()} hours`;
    } else if (d1 - d2 > 1) {
      caption = `<span class="text-fail">
${((d1 - d2) / d1 * 100).toFixed(2)}%
</span> decrease in ${list[length - 1].day.toLowerCase()} hours`;
    } else {
      caption = `You have worked <span class="text-success">${series.reduce((a, b) => a + b, 0).toFixed(2)}</span> hours in last 7 days`;
    }

    this.hoursChartCaption = caption;
  }
}
