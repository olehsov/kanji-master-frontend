import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EMPTY, Observable, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {KanjiService} from "../../services/kanji.service";
import {Word} from "../../interfaces/kanji-word.interface";
import {KanjiWordService} from "../../services/kanji-word.service";
import {Page} from "../../interfaces/page";
import {KanjiInfo} from "../../model/kanji-info.model";

@Component({
    selector: 'app-kanji',
    templateUrl: './kanji.component.html',
    styleUrls: ['./kanji.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanjiComponent {
    public words$: Observable<Page<Word>> = EMPTY;
    public readonly kanji$: Observable<KanjiInfo>;

    constructor(
        private readonly kanjiService: KanjiService,
        private readonly kanjiWordService: KanjiWordService,
        private readonly activatedRoute: ActivatedRoute
    ) {
        this.kanji$ = this.activatedRoute.params.pipe(
            switchMap(({id}) => this.getLoader(String(id)))
        );
    }

    // getFirstMeaning(meanings: Meaning[]): string {
    //     return meanings.length ? meanings[0].glosses[0] : '';
    // }

    private getLoader(kanji: string): Observable<KanjiInfo> {
        return this.kanjiService.getKanji(kanji).pipe(
            // tap(() => this.words$ = this.kanjiWordService.getPage(id))
        );
    }
}
