import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {Observable, of, switchMap, throwError} from "rxjs";
import {Page} from "../interfaces/page";
import {ISentence} from "../interfaces/sentence.interface";
import {SENTENCE_BY_KANJI_PAGE} from "../queries/sentence.queries";

@Injectable({
    providedIn: 'root'
})
export class SentenceService {

    constructor(private readonly apollo: Apollo) {
    }

    public getSentencePageByKanji(page: number, size: number, kanji: string): Observable<Page<ISentence>> {
        return this.apollo.watchQuery({
            query: SENTENCE_BY_KANJI_PAGE,
            variables: {page, size, kanji}
        }).valueChanges.pipe(
            switchMap(({data, error}) => {
                if (error) {
                    throw throwError(() => error)
                }
                return of(data.getSentencesByKanji);
            })
        );
    }
}
