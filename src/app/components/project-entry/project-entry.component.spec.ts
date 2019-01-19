import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectEntryComponent} from './project-entry.component';

describe('ProjectEntryComponent', () => {
  let component: ProjectEntryComponent;
  let fixture: ComponentFixture<ProjectEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectEntryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
