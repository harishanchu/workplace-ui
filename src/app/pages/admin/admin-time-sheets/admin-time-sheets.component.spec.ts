import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminTimeSheetsComponent} from './admin-time-sheets.component';

describe('AdminTimeSheetsComponent', () => {
  let component: AdminTimeSheetsComponent;
  let fixture: ComponentFixture<AdminTimeSheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTimeSheetsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTimeSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
