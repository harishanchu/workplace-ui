import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientsAndProjectsComponent } from './admin-clients-and-projects.component';

describe('AdminClientsAndProjectsComponent', () => {
  let component: AdminClientsAndProjectsComponent;
  let fixture: ComponentFixture<AdminClientsAndProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClientsAndProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientsAndProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
