import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEntryComponent } from './client-entry.component';

describe('ClientEntryComponent', () => {
  let component: ClientEntryComponent;
  let fixture: ComponentFixture<ClientEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
