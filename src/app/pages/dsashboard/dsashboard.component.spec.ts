import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsashboardComponent } from './dsashboard.component';

describe('DsashboardComponent', () => {
  let component: DsashboardComponent;
  let fixture: ComponentFixture<DsashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
