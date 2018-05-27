import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsGridComponent } from './clients-grid.component';

describe('ClientsGridComponent', () => {
  let component: ClientsGridComponent;
  let fixture: ComponentFixture<ClientsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
