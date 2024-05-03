import { Injectable } from '@angular/core';
import {Observable, of, switchMap, throwError} from "rxjs";
import {Page} from "../interfaces/page";
import {Kanji} from "../interfaces/kanji";
import {Apollo} from "apollo-angular";
import {KANJI_FIND_BY_ID, KANJI_SHORT_PAGE} from "../queries/kanji.queries";

@Injectable({
  providedIn: 'root'
})
export class KanjiService {
  constructor(private readonly apollo: Apollo) {}

  public getPage(page: number = 0, size: number = 10): Observable<Page<Kanji>> {
    return this.apollo.watchQuery({ query: KANJI_SHORT_PAGE, variables: { page, size } } ).valueChanges.pipe(
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
