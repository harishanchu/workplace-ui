import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectsGridComponent} from './projects-grid.component';

describe('ProjectsGridComponent', () => {
  let component: ProjectsGridComponent;
  let fixture: ComponentFixture<ProjectsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
