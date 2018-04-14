import { TestBed, inject } from '@angular/core/testing';

import { TimeSheetService } from './time-sheet.service';

describe('TimeSheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeSheetService]
    });
  });

  it('should be created', inject([TimeSheetService], (service: TimeSheetService) => {
    expect(service).toBeTruthy();
  }));
});
