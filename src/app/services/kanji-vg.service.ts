import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { KANJI_VG_KEYS } from '../shared/const/kanji-vg-keys.const';

/** Loads stroke-order SVGs (KanjiVG) shipped in `src/assets/kanji`. */
@Injectable({ providedIn: 'root' })
export class KanjiVgService {
  private readonly httpClient = inject(HttpClient);

  /** Emits the `<svg>` markup for a kanji, or `''` when there is no SVG. */
  public getKanjiSvgContent(kanji: string): Observable<string> {
    const fileName: string | undefined = KANJI_VG_KEYS[kanji]?.[0];
    if (!fileName) {
      return of('');
    }
    return this.httpClient
      .get(`/assets/kanji/${fileName}`, { responseType: 'text' })
      .pipe(map((svg) => svg.match(/<svg[^>]*>[\s\S]*?<\/svg>/)?.[0] ?? ''));
  }
}
