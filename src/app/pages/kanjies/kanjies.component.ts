import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {BehaviorSubject, EMPTY, map, Observable, switchMap} from "rxjs";
import {Kanji} from "../../interfaces/kanji";
import {KanjiService} from "../../services/kanji.service";
import {Page} from "../../interfaces/page";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-kanjies',
  templateUrl: './kanjies.component.html',
  styleUrls: ['./kanjies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanjiesComponent implements OnInit {
  private readonly batchSize: number;
  private readonly _kanjies$: BehaviorSubject<Page<Kanji> | null>;
  private readonly _loading$: BehaviorSubject<boolean>;
  public readonly loading$: Observable<boolean>;
  public readonly skeletons: number[];
  public readonly route: ActivatedRoute | null;
  public kanjies$: Observable<Kanji[]> = EMPTY;

  constructor(
      private readonly kanjiService: KanjiService,
      private readonly activatedRoute: ActivatedRoute
  ) {
    this.batchSize = 50;
    this._kanjies$ = new BehaviorSubject<Page<Kanji> | null>(null);
    this._loading$ = new BehaviorSubject<boolean>(false);
    this.loading$ = this._loading$.asObservable();
    this.skeletons = Array.from({ length: 9 }, (_, i) => i);
    this.route = this.activatedRoute.parent;
  }

  public ngOnInit(): void {
    this.kanjies$ = this._kanjies$.asObservable().pipe(
        switchMap(page => {
            if (!page) {
                this._loading$.next(true);
                return this.kanjiService.getPage(0, this.batchSize).pipe(
                    map(newPage => {
                        (this._kanjies$ as any)._value = newPage;
                        this._loading$.next(false);
                        return newPage.content;
                    }),
                );
            }
            this._loading$.next(true);
            return this.kanjiService.getPage(page.number + 1, this.batchSize).pipe(
                map(newPage => {
                    const content: Kanji[] = [...page.content, ...newPage.content];
                    (this._kanjies$ as any)._value = {...newPage, content };
                    this._loading$.next(false);
                    return content;
                }),
            );
        })
    );
  }

    @HostListener('window:scroll')
    onScroll(): void {
      const page: Page<Kanji> | null = this._kanjies$.getValue();
      if (this._loading$.getValue() || !page || page.last) return;

      const documentHeight: number = document.documentElement.scrollHeight;
      const threshold: number = 250;
      const isLoadingRequired: boolean = window.scrollY + window.innerHeight >= documentHeight - threshold;
      if (isLoadingRequired) {
          this._kanjies$.next({...page});
      }
    }
}
