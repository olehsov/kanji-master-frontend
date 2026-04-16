import {Injectable} from '@angular/core';
import {filter, map, Observable, of, switchMap} from "rxjs";
import {Apollo} from "apollo-angular";
import {TypedDocumentNode} from "@apollo/client/core";
import {HttpClient} from "@angular/common/http";
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
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class KanjiService {
    private readonly uri: string;

    constructor(private readonly apollo: Apollo, private readonly http: HttpClient) {
        this.uri = environment.apiUrl;
    }

    public getPage(page = 0, size = 10, kanjiFilter: KanjiFilter | null): Observable<Page<KanjiInfo>> {
        const variables: PageVariables & { filter?: KanjiFilter } = {page, size};
        const query: TypedDocumentNode<{ getKanjis: Page<KanjiInfo> }, PageVariables & {
            filter?: KanjiFilter
        }> = kanjiFilter ? KANJI_SHORT_FILTERED_PAGE : KANJI_SHORT_PAGE;
        if (kanjiFilter) {
            variables.filter = kanjiFilter;
        }
        return this.apollo.watchQuery({query, variables}).valueChanges.pipe(
            filter((result) => result.dataState === 'complete'),
            switchMap(({data, error}) => {
                if (error) {
                    throw new Error(error.message)
                }
                return of(data.getKanjis);
            })
        );
    }

    public getKanji(kanji: string): Observable<KanjiInfo> {
        return this.apollo.watchQuery({query: KANJI_FIND_BY_ID, variables: {kanji}}).valueChanges.pipe(
            filter((result) => result.dataState === 'complete'),
            switchMap(({data, error}) => {
                if (error) {
                    throw new Error(error.message)
                }
                return of(KanjiInfo.fromObject(data.getKanji));
            })
        );
    }

    public getKanjiesByRadicals(radicals: string[]): Observable<KanjiInfo[]> {
        return this.apollo.watchQuery({query: KANJIES_BY_RADICALS, variables: {radicals}}).valueChanges.pipe(
            filter((result) => result.dataState === 'complete'),
            switchMap(({data, error}) => {
                if (error) {
                    throw new Error(error.message)
                }
                return of(data.getKanjiesByRadical);
            })
        );
    }

    public downloadKanjiPdf(filter: KanjiFilter | null): Observable<void> {
        return this.http.post(`${this.uri}/pdf/kanji-practice`, filter, {responseType: 'blob'}).pipe(map(blob => {
            //const blob = new Blob([bytes], {type: 'application/pdf'});
            const url: string = window.URL.createObjectURL(blob);
            const a: HTMLAnchorElement = document.createElement('a');
            a.href = url;
            a.download = 'kanji_practice.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }));
    }
}
