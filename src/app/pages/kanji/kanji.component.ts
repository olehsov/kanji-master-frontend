import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EMPTY, map, Observable, switchMap, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Kanji} from "../../interfaces/kanji";
import {KanjiService} from "../../services/kanji.service";
import {Meaning, Word} from "../../interfaces/kanji-word.interface";
import {KanjiWordService} from "../../services/kanji-word.service";
import {Page} from "../../interfaces/page";

@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrls: ['./kanji.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanjiComponent {
  public words$: Observable<Page<Word>> = EMPTY;
  public readonly kanji$: Observable<Kanji>;

  constructor(
      private readonly kanjiService: KanjiService,
      private readonly kanjiWordService: KanjiWordService,
      private readonly activatedRoute: ActivatedRoute
  ) {
    this.kanji$ = this.activatedRoute.params.pipe(
        map(({ id }) => +id),
        switchMap((id: number) => this.getLoader(id))
    );
  }

  getFirstMeaning(meanings: Meaning[]): string {
    return meanings.length ? meanings[0].glosses[0] : '';
  }

  private getLoader(id: number): Observable<Kanji> {
    return this.kanjiService.getKanji(id).pipe(
        tap(() => this.words$ = this.kanjiWordService.getPage(id))
    );
  }
}
