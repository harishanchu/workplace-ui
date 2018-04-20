import { TestBed, async, inject } from '@angular/core/testing';

import { AuthAdminGuard } from './auth-admin.guard';

describe('AuthAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthAdminGuard]
    });
  });

  it('should ...', inject([AuthAdminGuard], (guard: AuthAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
