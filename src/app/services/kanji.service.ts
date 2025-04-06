import {Injectable} from '@angular/core';
import {map, Observable, of, switchMap, throwError} from "rxjs";
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
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class KanjiService {
    private readonly uri: string;

    constructor(private readonly apollo: Apollo, private readonly http: HttpClient) {
        this.uri = environment.apiUrl;
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
