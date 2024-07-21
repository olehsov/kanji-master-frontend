import { TestBed } from '@angular/core/testing';

import { RadicalSearchOptionService } from './radical-search-option.service';

describe('RadicalSearchOptionService', () => {
  let service: RadicalSearchOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadicalSearchOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
