import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Apollo } from 'apollo-angular';
import { KanjiService } from './kanji.service';
import { KanjiFilter } from '../interfaces/kanji-filter';
import { environment } from '../../environments/environment';

describe('KanjiService.downloadKanjiPdf', () => {
  const filter: KanjiFilter = {
    jlpt: ['N5 (beginner)'],
    grade: [],
    search: '',
  };
  const url = `${environment.apiUrl}/pdf/kanji-practice`;
  let service: KanjiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Apollo, useValue: {} },
      ],
    });
    service = TestBed.inject(KanjiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    vi.restoreAllMocks();
  });

  it('posts the filter and saves the returned PDF', () => {
    URL.createObjectURL = vi.fn(() => 'blob:kanji');
    URL.revokeObjectURL = vi.fn();
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => undefined);
    let done = false;

    service.downloadKanjiPdf(filter).subscribe(() => (done = true));
    const request = http.expectOne(url);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(filter);
    expect(request.request.responseType).toBe('blob');
    request.flush(new Blob(['%PDF'], { type: 'application/pdf' }));

    expect(done).toBe(true);
    expect(click).toHaveBeenCalledTimes(1);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:kanji');
  });

  it('passes a 404 through so the page can explain that nothing matched', () => {
    let error: HttpErrorResponse | undefined;

    service.downloadKanjiPdf(filter).subscribe({ error: (e) => (error = e) });
    http
      .expectOne(url)
      .flush(new Blob(['{"detail":"No kanji match the filter"}']), {
        status: 404,
        statusText: 'Not Found',
      });

    expect(error?.status).toBe(404);
  });
});
