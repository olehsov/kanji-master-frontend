import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Subject, throwError } from 'rxjs';
import {
  KanjiesComponent,
  PDF_ERROR_MESSAGE,
  PDF_NOT_FOUND_MESSAGE,
  toKanjiFilter,
} from './kanjies.component';
import { KanjiService } from '../../services/kanji.service';
import { Page } from '../../interfaces/page';
import { KanjiDto } from '../../model/kanji-info.model';

describe('KanjiesComponent', () => {
  function setup(
    getPage: KanjiService['getPage'],
    downloadKanjiPdf: KanjiService['downloadKanjiPdf'] = () => of(undefined),
  ) {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: KanjiService, useValue: { getPage, downloadKanjiPdf } },
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

  describe('PDF download', () => {
    const emptyPage = () =>
      of({ content: [], number: 0, last: true } as unknown as Page<KanjiDto>);

    async function renderWithPdf(
      downloadKanjiPdf: KanjiService['downloadKanjiPdf'],
    ) {
      const fixture = setup(emptyPage, downloadKanjiPdf);
      await fixture.whenStable();
      const element = fixture.nativeElement as HTMLElement;
      const button = () =>
        element.querySelector<HTMLButtonElement>('.pdf-download-button')!;
      const message = () =>
        element.querySelector('.pdf-download-message')?.textContent?.trim();
      const typeSearch = async (text: string) => {
        const input = element.querySelector<HTMLInputElement>(
          'input[formControlName="search"]',
        )!;
        input.value = text;
        input.dispatchEvent(new Event('input'));
        await fixture.whenStable();
      };
      return { fixture, button, message, typeSearch };
    }

    it('is disabled while no filter is set (an empty filter renders the whole dictionary)', async () => {
      const download = vi.fn(() => of(undefined));
      const { button } = await renderWithPdf(download);

      expect(button().disabled).toBe(true);
      button().click();
      expect(download).not.toHaveBeenCalled();
    });

    it('downloads the PDF for the filter the list uses', async () => {
      const download = vi.fn(() => of(undefined));
      const { button, typeSearch } = await renderWithPdf(download);

      await typeSearch('hito');
      expect(button().disabled).toBe(false);
      button().click();

      expect(download).toHaveBeenCalledExactlyOnceWith({
        jlpt: [],
        grade: [],
        search: 'hito',
      });
    });

    it('shows a loading state while the PDF is generated', async () => {
      const response = new Subject<void>();
      const { fixture, button, typeSearch } = await renderWithPdf(
        () => response,
      );
      const element = fixture.nativeElement as HTMLElement;

      await typeSearch('hito');
      button().click();
      await fixture.whenStable();
      expect(button().disabled).toBe(true);
      expect(button().textContent).toContain('Готуємо PDF');
      expect(element.querySelector('.pdf-download-progress')).not.toBeNull();

      response.next();
      response.complete();
      await fixture.whenStable();
      expect(button().disabled).toBe(false);
      expect(button().textContent).toContain('Завантажити PDF');
      expect(element.querySelector('.pdf-download-progress')).toBeNull();
    });

    it('explains a 404 (no kanji match) in Ukrainian', async () => {
      const { fixture, button, message, typeSearch } = await renderWithPdf(() =>
        throwError(
          () =>
            new HttpErrorResponse({
              status: 404,
              error: new Blob(['{"detail":"No kanji match the filter"}']),
            }),
        ),
      );

      await typeSearch('zzz');
      button().click();
      await fixture.whenStable();

      expect(message()).toBe(PDF_NOT_FOUND_MESSAGE);
      expect(button().disabled).toBe(false);
    });

    it('shows a generic message for other errors and clears it when the filter changes', async () => {
      const { fixture, button, message, typeSearch } = await renderWithPdf(() =>
        throwError(() => new HttpErrorResponse({ status: 500 })),
      );

      await typeSearch('hito');
      button().click();
      await fixture.whenStable();
      expect(message()).toBe(PDF_ERROR_MESSAGE);

      await typeSearch('yama');
      expect(message()).toBeUndefined();
    });
  });
});

describe('toKanjiFilter', () => {
  it('returns null when nothing is selected', () => {
    expect(toKanjiFilter({ jlpt: [], grade: [], search: '' })).toBeNull();
  });

  it('keeps the stored JLPT and grade strings', () => {
    const filter = {
      jlpt: ['N5 (beginner)'],
      grade: ['Kyōiku-Jōyō (1st grade of primary school)'],
      search: '',
    };
    expect(toKanjiFilter(filter)).toEqual(filter);
  });
});
