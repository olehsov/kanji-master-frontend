import { Injectable } from '@angular/core';
import {Observable, of, switchMap, throwError} from "rxjs";
import {Apollo} from "apollo-angular";
import {Page} from "../interfaces/page";
import {Kanji} from "../interfaces/kanji";
import {KANJI_FIND_BY_ID, KANJI_SHORT_FILTERED_PAGE} from "../queries/kanji.queries";
import {KanjiFilter} from "../interfaces/kanji-filter";

@Injectable({
  providedIn: 'root'
})
export class KanjiService {
  constructor(private readonly apollo: Apollo) {}

  public getPage(page = 0, size = 10, filter: KanjiFilter | null): Observable<Page<Kanji>> {
    return this.apollo.watchQuery({ query: KANJI_SHORT_FILTERED_PAGE, variables: { page, size, filter } } ).valueChanges.pipe(
        switchMap(({data, error}) => {
          if (error) {
            throw throwError(() => error)
          }
          return of(data.getKanjis);
        })
    );
  }

    public getKanji(id: number): Observable<Kanji> {
        return this.apollo.watchQuery({ query: KANJI_FIND_BY_ID, variables: { id } } ).valueChanges.pipe(
            switchMap(({data, error}) => {
                if (error) {
                    throw throwError(() => error)
                }
                return of(data.getKanji);
            })
        );
    }
}
