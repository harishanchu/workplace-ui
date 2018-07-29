import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminTimeSheetGridComponent} from './admin-time-sheet-grid.component';

describe('AdminTimeSheetGridComponent', () => {
  let component: AdminTimeSheetGridComponent;
  let fixture: ComponentFixture<AdminTimeSheetGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTimeSheetGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTimeSheetGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
