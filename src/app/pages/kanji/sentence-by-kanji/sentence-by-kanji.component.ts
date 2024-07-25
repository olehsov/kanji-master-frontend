import {Component, Input} from '@angular/core';
import {EMPTY, Observable} from "rxjs";
import {Page} from "../../../interfaces/page";
import {ISentence} from "../../../interfaces/sentence.interface";
import {SentenceService} from "../../../services/sentence.service";

@Component({
    selector: 'app-sentence-by-kanji',
    templateUrl: './sentence-by-kanji.component.html',
    styleUrl: './sentence-by-kanji.component.scss'
})
export class SentenceByKanjiComponent {
    public sentences$: Observable<Page<ISentence>> = EMPTY;
    private page: number;
    private size: number;

    constructor(private readonly sentenceService: SentenceService) {
        this.page = 1;
        this.size = 15;
    }

    private _kanji?: string;

    @Input()
    set kanji(kanji: string | undefined) {
        this._kanji = kanji;
        this.sentences$ = this.sentenceService.getSentencePageByKanji(this.page, this.size, this._kanji as string)
    }
}
