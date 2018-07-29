import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminMainToolbarComponent} from './admin-main-toolbar.component';

describe('AdminMainToolbarComponent', () => {
  let component: AdminMainToolbarComponent;
  let fixture: ComponentFixture<AdminMainToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMainToolbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMainToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
