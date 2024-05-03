import { Component } from '@angular/core';
import {map, Observable, switchMap} from "rxjs";
import {Kanji} from "../../interfaces/kanji";
import {KanjiService} from "../../services/kanji.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrls: ['./kanji.component.scss']
})
export class KanjiComponent {
  public readonly kanji$: Observable<Kanji>;

  constructor(
      private readonly kanjiService: KanjiService,
      private readonly activatedRoute: ActivatedRoute
  ) {
    this.kanji$ = this.activatedRoute.params.pipe(
        map(({ id }) => +id),
        switchMap((id: number) => this.kanjiService.getKanji(id))
    );
  }
}
