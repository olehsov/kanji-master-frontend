import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {Observable, of, switchMap, throwError} from "rxjs";
import {Page} from "../interfaces/page";
import {WORD_BY_KANJI_PAGE} from "../queries/kanji.queries";
import {Word} from "../interfaces/kanji-word.interface";

@Injectable({
    providedIn: 'root'
})
export class KanjiWordService {
    constructor(private readonly apollo: Apollo) {
    }

    public getPage(kanjiId: number, page = 0, size = 10): Observable<Page<Word>> {
        return this.apollo.watchQuery({query: WORD_BY_KANJI_PAGE, variables: {page, size, kanjiId}}).valueChanges.pipe(
            switchMap(({data, error}) => {
                if (error) {
                    throw throwError(() => error)
                }
                return of(data.getWordsByKanji);
            })
        );
    }
}
