import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTasksListComponent } from './open-tasks-list.component';

describe('OpenTasksListComponent', () => {
  let component: OpenTasksListComponent;
  let fixture: ComponentFixture<OpenTasksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenTasksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
