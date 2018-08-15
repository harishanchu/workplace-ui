import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetGridInfoComponent } from './time-sheet-grid-info.component';

describe('TimeSheetGridInfoComponent', () => {
  let component: TimeSheetGridInfoComponent;
  let fixture: ComponentFixture<TimeSheetGridInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetGridInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetGridInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
