import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {BehaviorSubject, debounceTime, EMPTY, map, Observable, of, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {KanjiService} from "../../services/kanji.service";
import {Page} from "../../interfaces/page";
import {KanjiInfo} from "../../model/kanji-info.model";
import {GRADE_ITEMS, JLPT_ITEMS} from "./consts/form-filter.const";
import {FormBuilder, FormGroup} from "@angular/forms";
import {KanjiFilter} from "../../interfaces/kanji-filter";
import {SelectValue} from "../../interfaces/select-value";


@Component({
    selector: 'app-kanjies',
    templateUrl: './kanjies.component.html',
    styleUrls: ['./kanjies.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanjiesComponent implements OnInit {
    public kanjies$: Observable<KanjiInfo[]> = EMPTY;
    public isGradeExpanded: boolean;
    public readonly loading$: Observable<boolean>;
    public readonly route: ActivatedRoute | null;
    public readonly jlpt: SelectValue<string>[];
    public readonly grades: string[];
    public readonly form: FormGroup;
    private readonly batchSize: number;
    private readonly _kanjies$: BehaviorSubject<Page<KanjiInfo> | 'reset' | 'init'>;
    private readonly _loading$: BehaviorSubject<boolean>;


    constructor(
        private readonly kanjiService: KanjiService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly fb: FormBuilder
    ) {
        this.batchSize = 75;
        this._kanjies$ = new BehaviorSubject<Page<KanjiInfo> | 'reset' | 'init'>('init');
        this._loading$ = new BehaviorSubject<boolean>(false);
        this.loading$ = this._loading$.asObservable();
        this.route = this.activatedRoute.parent;
        this.jlpt = JLPT_ITEMS;
        this.grades = GRADE_ITEMS;
        this.form = this.fb.group({
            jlpt: [[]],
            grade: [[]],
            search: ''
        });
        this.form.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
            this._kanjies$.next('reset');
            this._kanjies$.next('init');
        })
        this.isGradeExpanded = true;
    }

    public ngOnInit(): void {
        this.kanjies$ = this._kanjies$.asObservable().pipe(
            switchMap(page => {
                if (page === 'reset') {
                    this._loading$.next(true);
                    return of([]);
                }
                if (page === 'init') {
                    this._loading$.next(true);
                    return this.kanjiService.getPage(0, this.batchSize, this.getFilter()).pipe(
                        map(newPage => {
                            (this._kanjies$ as any)._value = newPage;
                            this._loading$.next(false);
                            return newPage.content;
                        }),
                    );
                }
                this._loading$.next(true);
                return this.kanjiService.getPage(page.number + 1, this.batchSize, this.getFilter()).pipe(
                    map(newPage => {
                        const content: KanjiInfo[] = [...page.content, ...newPage.content];
                        (this._kanjies$ as any)._value = {...newPage, content};
                        this._loading$.next(false);
                        return content;
                    }),
                );
            })
        );
    }

    @HostListener('window:scroll')
    onScroll(): void {
        const page: Page<KanjiInfo> | 'reset' | 'init' = this._kanjies$.getValue();
        if (this._loading$.getValue() || page === 'reset' || page === 'init' || page.last) return;

        const documentHeight: number = document.documentElement.scrollHeight;
        const threshold = 250;
        const isLoadingRequired: boolean = window.scrollY + window.innerHeight >= documentHeight - threshold;
        if (isLoadingRequired) {
            this._kanjies$.next({...page});
        }
    }

    private getFilter(): KanjiFilter | null {
        const filter: KanjiFilter = {...this.form.value};
        if (filter.jlpt.length || filter.grade.length || filter.search) {
            return filter;
        }
        return null;
    }
}
