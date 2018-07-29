import {inject, TestBed} from '@angular/core/testing';

import {GuestGuard} from './guest.guard';

describe('GuestGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuestGuard]
    });
  });

  it('should ...', inject([GuestGuard], (guard: GuestGuard) => {
    expect(guard).toBeTruthy();
  }));
});
