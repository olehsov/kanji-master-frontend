import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { SearchKanjiByRadicalsComponent } from './search-kanji-by-radicals.component';
import { RadicalSearchOptionService } from '../../services/radical-search-option.service';
import { KanjiService } from '../../services/kanji.service';

describe('SearchKanjiByRadicalsComponent', () => {
  it('groups radicals by stroke count and resets without errors', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: RadicalSearchOptionService,
          useValue: {
            getRadicalSearchOptions: () =>
              of([
                { radical: '一', strokes: 1, isSimplifiedRadical: false },
                { radical: '人', strokes: 2, isSimplifiedRadical: false },
                { radical: '二', strokes: 2, isSimplifiedRadical: false },
              ]),
          },
        },
        {
          provide: KanjiService,
          useValue: { getKanjiesByRadicals: () => of([]) },
        },
      ],
    });
    const fixture = TestBed.createComponent(SearchKanjiByRadicalsComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('.stroke-list-box').length).toBe(2);

    const resetButton = element.querySelector<HTMLButtonElement>(
      'button.clear-button',
    );
    expect(() => resetButton?.click()).not.toThrow();
    await fixture.whenStable();
  });
});
