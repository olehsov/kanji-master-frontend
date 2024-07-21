import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {Observable, switchMap, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {KanjiService} from "../../services/kanji.service";
import {KanjiInfo} from "../../model/kanji-info.model";
import {KanjiVgService} from "../../services/kanji-vg.service";

@Component({
    selector: 'app-kanji',
    templateUrl: './kanji.component.html',
    styleUrls: ['./kanji.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanjiComponent {
    public readonly kanji$: Observable<KanjiInfo>;
    public readonly kanjiSvgContent$: Observable<string>;

    constructor(
        private readonly kanjiService: KanjiService,
        private readonly activatedRoute: ActivatedRoute,
        public readonly kanjiVgService: KanjiVgService,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {
        this.kanji$ = this.activatedRoute.params.pipe(
            switchMap(({id}) => this.getLoader(String(id))),
        );
        this.kanjiSvgContent$ = this.activatedRoute.params.pipe(
            switchMap(({id}) => this.kanjiVgService.getKanjiSvgContent(String(id))),
        );
    }

    private getLoader(kanji: string): Observable<KanjiInfo> {
        return this.kanjiService.getKanji(kanji).pipe(
            tap(() => {
                console.log(document.getElementById('kanji-drawing'));
            })
        );
    }
}
