import {Injectable} from '@angular/core';
import {KANJI_VG_KEYS} from "../shared/const/kanji-vg-keys.const";
import {EMPTY, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class KanjiVgService {
    private readonly kanjiVgKeys: { [key: string]: string[] };

    constructor(private readonly httpClient: HttpClient) {
        this.kanjiVgKeys = KANJI_VG_KEYS;
    }

    getKanjiSvgs(kanji: string): string[] {
        const kanjiKey: string[] | null = this.kanjiVgKeys[kanji];
        if (kanjiKey)
            return kanjiKey.map(kanji => `/assets/kanji/${kanji}`);
        return [];
    }

    getKanjiSvgContent(kanji: string): Observable<string> {
        const kanjiKey: string[] | null = this.kanjiVgKeys[kanji];
        if (kanjiKey && kanjiKey.length)
            return this.httpClient.get(`/assets/kanji/${kanjiKey[0]}`, {responseType: 'text'}).pipe(map(svgContent => {
                if (svgContent) {
                    const parsedValue: RegExpMatchArray | null = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
                    return parsedValue ? parsedValue[0] : '';
                }
                return '';
            }))
        return EMPTY;
    }
}
