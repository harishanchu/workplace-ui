import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksGridComponent } from './tasks-grid.component';

describe('TasksGridComponent', () => {
  let component: TasksGridComponent;
  let fixture: ComponentFixture<TasksGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
