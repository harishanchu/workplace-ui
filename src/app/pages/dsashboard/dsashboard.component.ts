import {Component, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import '../../plugins/chartist-plugin-tooltip/chartist-plugin-tooltip.js';
import {ChartEvent, ChartType} from 'ng-chartist';
import {AppService} from '../../services/app.service';
import {UserStats} from '../../models/UserStats';
import {Globals} from '../../globals';

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
  private tasksChartCaption: string;
  private resourceAllocationChartCaption: string;
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
      'labels': [],
      'series': []
    }
  };
  private resourceAllocationChart = <Chart> {
    data: {
      series: []
    },
    options: {
      donut: true,
      donutWidth: 40,
      donutSolid: true,
      startAngle: 270,
      showLabel: true,
      plugins: [
        Chartist.plugins.tooltip({
          tooltipOffset: {
            x: 30,
            y: 112
          },
          unit: 'hrs'
        })
      ]
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

  constructor(private appService: AppService, private globals: Globals) {
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
    this.refreshResourceUtilizationChart();
    this.refreshTasksChart();
  }

  refreshHoursChart() {
    const labels = [];
    const series = [];
    let caption;
    const list = this.stats.DailyDurationForLast7Days;
    const length = list.length;

    list.forEach(item => {
      labels.push(item.day.substr(0, 1).toUpperCase());
      series.push((item.duration / 60));
    });

    this.hoursChart.data = {labels, series: [series]};

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
      caption = `You have worked <span class="text-success">${series.reduce((a, b) => a + b, 0).toFixed(2)}</span> hours in last 7 worked days`;
    }

    this.hoursChartCaption = caption;
  }

  refreshResourceUtilizationChart() {
    const list = this.stats.last7daysResourceAllocationPerClient;
    const series = [];
    const labels = [];

    list.forEach(item => {
      labels.push(item.clientName);
      series.push({
        value: (item.duration / 60).toFixed(2),
        meta: item.clientName
      });
    });

    this.resourceAllocationChart.data = {
      series,
      labels
    };

    if (list.length) {
      const client = list.reduce((item, current) => {
        if (!current || (current && current.duration < item.duration)) {
          current = item;
        }

        return current;
      });
      this.resourceAllocationChartCaption = `You have worked for client ${client.clientName} the highest in last 7 days`;
    } else {
      this.resourceAllocationChartCaption = `You haven't logged any time sheet for last 7 days`;
    }
  }

  refreshTasksChart() {
    const labels = [];
    const series = [];
    let caption;
    const list = this.stats.dailyCompletedTasksForLast7Days;
    const length = list.length;

    list.forEach(item => {
      labels.push(item.day.substr(0, 1).toUpperCase());
      series.push((item.count));
    });

    this.tasksChart.data = {labels, series: [series]};

    let d1 = series[length - 2];
    let d2 = series[length - 1];

    if (d2 - d1 > 1) {
      caption = `<span class="text-success">
${((d2 - d1) / d1 * 100).toFixed(2)}%
</span> increase in ${list[length - 1].day.toLowerCase()} completed tasks`;
    } else if (d1 - d2 > 1) {
      caption = `<span class="text-fail">
${((d1 - d2) / d1 * 100).toFixed(2)}%
</span> decrease in ${list[length - 1].day.toLowerCase()} completed tasks`;
    } else {
      caption = `You have completed <span class="text-success">${series.reduce((a, b) => a + b, 0)}</span> tasks in last 7 worked days`;
    }

    this.tasksChartCaption = caption;
  }
}
