import {Injectable} from '@angular/core';
import {Observable, of, switchMap, throwError} from "rxjs";
import {Apollo} from "apollo-angular";
import {Page} from "../interfaces/page";
import {
    KANJI_FIND_BY_ID,
    KANJI_SHORT_FILTERED_PAGE,
    KANJI_SHORT_PAGE,
    KANJIES_BY_RADICALS
} from "../queries/kanji.queries";
import {KanjiInfo} from "../model/kanji-info.model";
import {KanjiFilter} from "../interfaces/kanji-filter";
import {PageVariables} from "../variables/page.variables";
import {TypedDocumentNode} from "@apollo/client/core";

@Injectable({
    providedIn: 'root'
})
export class KanjiService {
    constructor(private readonly apollo: Apollo) {
    }

    public getPage(page = 0, size = 10, filter: KanjiFilter | null): Observable<Page<KanjiInfo>> {
        const variables: PageVariables & { filter?: KanjiFilter } = {page, size};
        const query: TypedDocumentNode<{ getKanjis: Page<KanjiInfo> }, PageVariables & {
            filter?: KanjiFilter
        }> = filter ? KANJI_SHORT_FILTERED_PAGE : KANJI_SHORT_PAGE;
        if (filter) {
            variables.filter = filter;
        }
        return this.apollo.watchQuery({query, variables}).valueChanges.pipe(
            switchMap(({data, error}) => {
                if (error) {
                    throw throwError(() => error)
                }
                return of(data.getKanjis);
            })
        );
    }

    public getKanji(kanji: string): Observable<KanjiInfo> {
        return this.apollo.watchQuery({query: KANJI_FIND_BY_ID, variables: {kanji}}).valueChanges.pipe(
            switchMap(({data, error}) => {
                if (error) {
                    throw throwError(() => error)
                }
                return of(KanjiInfo.fromObject(data.getKanji));
            })
        );
    }

    public getKanjiesByRadicals(radicals: string[]): Observable<KanjiInfo[]> {
        return this.apollo.watchQuery({query: KANJIES_BY_RADICALS, variables: {radicals}}).valueChanges.pipe(
            switchMap(({data, error}) => {
                if (error) {
                    throw throwError(() => error)
                }
                return of(data.getKanjiesByRadical);
            })
        );
    }
}
