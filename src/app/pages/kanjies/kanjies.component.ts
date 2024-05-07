import {AfterViewInit, ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, debounceTime, EMPTY, map, Observable, switchMap} from "rxjs";
import {Kanji} from "../../interfaces/kanji";
import {KanjiService} from "../../services/kanji.service";
import {Page} from "../../interfaces/page";
import {ActivatedRoute} from "@angular/router";
import {SelectItemGroup} from "primeng/api";
import {KANJI_FILTER_OPTIONS} from "./consts/form-filter.const";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MultiSelect, MultiSelectChangeEvent} from "primeng/multiselect";
import {KanjiFilter} from "../../interfaces/kanji-filter";
import {KanjiFilterSelectedValue} from "./interfaces/kanji-filter-selected-value";

@Component({
  selector: 'app-kanjies',
  templateUrl: './kanjies.component.html',
  styleUrls: ['./kanjies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanjiesComponent implements OnInit, AfterViewInit {
    @ViewChild(MultiSelect) multiSelect?: MultiSelect;
  private readonly batchSize: number;
  private readonly _kanjies$: BehaviorSubject<Page<Kanji> | null>;
  private readonly _loading$: BehaviorSubject<boolean>;
  public readonly loading$: Observable<boolean>;
  public readonly skeletons: number[];
  public readonly route: ActivatedRoute | null;
  public readonly filterOptions: SelectItemGroup[];
  public kanjies$: Observable<Kanji[]> = EMPTY;
  private filter: KanjiFilter | null;


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
    this.filter = null;
    this.filterOptions = KANJI_FILTER_OPTIONS;
  }

  public ngOnInit(): void {
    this.kanjies$ = this._kanjies$.asObservable().pipe(
        switchMap(page => {
            if (!page) {
                this._loading$.next(true);
                return this.kanjiService.getPage(0, this.batchSize, this.filter).pipe(
                    map(newPage => {
                        (this._kanjies$ as any)._value = newPage;
                        this._loading$.next(false);
                        return newPage.content;
                    }),
                );
            }
            this._loading$.next(true);
            return this.kanjiService.getPage(page.number + 1, this.batchSize, this.filter).pipe(
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

  public ngAfterViewInit(): void {
      if (!this.multiSelect)
          return

      this.multiSelect.onChange.pipe(debounceTime(1000)).subscribe(this.onFilterChanged.bind(this));
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

    onFilterChanged($event: MultiSelectChangeEvent): void {
        const selected: KanjiFilterSelectedValue[] = $event.value;
        if (!selected || !selected.length) {
            this.filter = null;
            return;
        }
        const jlpt: number[] = selected.filter(({type}) => type === 'jlpt').map(({ value }) => value);
        const grade: number[] = selected.filter(({type}) => type === 'grade').map(({ value }) => value);
        this.filter = { jlpt, grade, strokeCount: []};
        this._kanjies$.next(null)
    }
}
