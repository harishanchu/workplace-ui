import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetGridComponent } from './time-sheet-grid.component';

describe('TimeSheetGridComponent', () => {
  let component: TimeSheetGridComponent;
  let fixture: ComponentFixture<TimeSheetGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
