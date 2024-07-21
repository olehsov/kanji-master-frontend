import { TestBed } from '@angular/core/testing';

import { KanjivgService } from './kanjivg.service';

describe('KanjivgService', () => {
  let service: KanjivgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KanjivgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
