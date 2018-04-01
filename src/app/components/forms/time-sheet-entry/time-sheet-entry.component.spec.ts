import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetEntryComponent } from './time-sheet-entry.component';

describe('TimeSheetEntryComponent', () => {
  let component: TimeSheetEntryComponent;
  let fixture: ComponentFixture<TimeSheetEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
