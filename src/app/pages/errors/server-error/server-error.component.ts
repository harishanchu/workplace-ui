import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss'],
  host: {'class': 'container'}
})

export class ServerErrorComponent implements OnInit {
  public loading = true;

  constructor() {
    setTimeout(() => this.loading = false, 1000);
  }

  ngOnInit() {
  }

}
