import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Page } from '../interfaces/page';
import {
  KANJI_FIND_BY_ID,
  KANJI_SHORT_FILTERED_PAGE,
  KANJI_SHORT_PAGE,
  KANJIES_BY_RADICALS,
} from '../queries/kanji.queries';
import { KanjiDto, KanjiInfo, toKanjiInfo } from '../model/kanji-info.model';
import { KanjiFilter } from '../interfaces/kanji-filter';
import { environment } from '../../environments/environment';
import { apolloQuery } from '../shared/utils/apollo-query';

@Injectable({ providedIn: 'root' })
export class KanjiService {
  private readonly apollo = inject(Apollo);
  private readonly http = inject(HttpClient);
  private readonly uri = environment.apiUrl;

  public getPage(
    page: number,
    size: number,
    kanjiFilter: KanjiFilter | null,
  ): Observable<Page<KanjiDto>> {
    return kanjiFilter
      ? apolloQuery(
          this.apollo,
          KANJI_SHORT_FILTERED_PAGE,
          { page, size, filter: kanjiFilter },
          (data) => data.getKanjis,
        )
      : apolloQuery(
          this.apollo,
          KANJI_SHORT_PAGE,
          { page, size },
          (data) => data.getKanjis,
        );
  }

  public getKanji(kanji: string): Observable<KanjiInfo> {
    return apolloQuery(this.apollo, KANJI_FIND_BY_ID, { kanji }, (data) =>
      toKanjiInfo(data.getKanji),
    );
  }

  public getKanjiesByRadicals(radicals: string[]): Observable<KanjiDto[]> {
    return apolloQuery(
      this.apollo,
      KANJIES_BY_RADICALS,
      { radicals },
      (data) => data.getKanjiesByRadical,
    );
  }

  /** Downloads a printable practice sheet. Not wired to the UI yet. */
  public downloadKanjiPdf(filter: KanjiFilter | null): Observable<void> {
    return this.http
      .post(`${this.uri}/pdf/kanji-practice`, filter, { responseType: 'blob' })
      .pipe(
        map((blob) => {
          const url = URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = 'kanji_practice.pdf';
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          URL.revokeObjectURL(url);
        }),
      );
  }
}
