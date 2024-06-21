import { TestBed } from '@angular/core/testing';

import { KanjiWordService } from './kanji-word.service';

describe('KanjiWordService', () => {
  let service: KanjiWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KanjiWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
