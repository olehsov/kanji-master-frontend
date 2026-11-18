import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { KanjiesComponent } from './kanjies.component';
import { KanjiService } from '../../services/kanji.service';
import { Page } from '../../interfaces/page';
import { KanjiDto } from '../../model/kanji-info.model';

describe('KanjiesComponent', () => {
  function setup(getPage: KanjiService['getPage']) {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: KanjiService, useValue: { getPage } },
      ],
    });
    return TestBed.createComponent(KanjiesComponent);
  }

  it('renders the first page as links', async () => {
    const fixture = setup(() =>
      of({
        content: [
          { kanji: '人', meaning: 'person;people', jlpt: 'N5 (beginner)' },
          { kanji: '日' },
        ],
        number: 0,
        last: true,
        first: true,
      } as unknown as Page<KanjiDto>),
    );
    await fixture.whenStable();
    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll(
      'a.kanji-card',
    );
    expect(
      [...cards].map((c) => c.querySelector('[lang="ja"]')?.textContent),
    ).toEqual(['人', '日']);
    expect(cards[0].getAttribute('href')).toBe('/kanji/%E4%BA%BA');
    expect(cards[0].getAttribute('aria-label')).toBe('人 — person');
    expect(cards[0].querySelector('.kanji-card-meaning')?.textContent).toBe(
      'person',
    );
    expect(cards[0].querySelector('.kanji-card-badge')?.textContent).toBe('N5');
    expect(cards[1].getAttribute('aria-label')).toBe('日');
  });

  it('shows an error instead of spinning forever', async () => {
    const fixture = setup(() => throwError(() => new Error('down')));
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[role="alert"]')).not.toBeNull();
    expect(element.querySelector('mat-progress-bar')).toBeNull();
  });
});
