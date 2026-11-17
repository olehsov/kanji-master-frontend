import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Page } from '../interfaces/page';
import { ISentence } from '../interfaces/sentence.interface';
import { SENTENCE_BY_KANJI_PAGE } from '../queries/sentence.queries';
import { apolloQuery } from '../shared/utils/apollo-query';

@Injectable({ providedIn: 'root' })
export class SentenceService {
  private readonly apollo = inject(Apollo);

  public getSentencePageByKanji(
    page: number,
    size: number,
    kanji: string,
  ): Observable<Page<ISentence>> {
    return apolloQuery(
      this.apollo,
      SENTENCE_BY_KANJI_PAGE,
      { page, size, kanji },
      (data) => data.getSentencesByKanji,
    );
  }
}
