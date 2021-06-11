import { TestBed } from '@angular/core/testing';

import { ControlGiftService } from './control-gift.service';

describe('ControlGiftService', () => {
  let service: ControlGiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlGiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
