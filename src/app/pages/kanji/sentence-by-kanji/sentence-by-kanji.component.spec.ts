import { TestBed } from '@angular/core/testing';
import { EMPTY } from 'rxjs';
import {
  FIRST_PAGE,
  PAGE_SIZE,
  SentenceByKanjiComponent,
} from './sentence-by-kanji.component';
import { SentenceService } from '../../../services/sentence.service';

describe('SentenceByKanjiComponent', () => {
  it('requests page 0 first because backend pages are 0-based', async () => {
    const getSentencePageByKanji = vi.fn(() => EMPTY);
    TestBed.configureTestingModule({
      providers: [
        { provide: SentenceService, useValue: { getSentencePageByKanji } },
      ],
    });
    const fixture = TestBed.createComponent(SentenceByKanjiComponent);
    fixture.componentRef.setInput('kanji', '人');
    await fixture.whenStable();

    expect(FIRST_PAGE).toBe(0);
    expect(getSentencePageByKanji).toHaveBeenCalledExactlyOnceWith(
      0,
      PAGE_SIZE,
      '人',
    );
  });
});
