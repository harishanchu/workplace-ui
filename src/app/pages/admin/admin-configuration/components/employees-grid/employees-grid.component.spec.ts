import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesGridComponent } from './employees-grid.component';

describe('EmployeesGridComponent', () => {
  let component: EmployeesGridComponent;
  let fixture: ComponentFixture<EmployeesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
