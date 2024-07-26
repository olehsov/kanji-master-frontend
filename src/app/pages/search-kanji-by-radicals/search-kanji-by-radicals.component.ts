import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {debounceTime, EMPTY, map, Observable, of} from "rxjs";
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {RadicalSearchOptionService} from "../../services/radical-search-option.service";
import {IRadicalSearchOption} from "../../interfaces/radical-search-option.interface";
import {KanjiInfo} from "../../model/kanji-info.model";
import {KanjiService} from "../../services/kanji.service";
import {SelectValue} from "../../interfaces/select-value";

@Component({
    selector: 'app-search-kanji-by-radicals',
    templateUrl: './search-kanji-by-radicals.component.html',
    styleUrl: './search-kanji-by-radicals.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchKanjiByRadicalsComponent implements OnInit {
    public kanjies$: Observable<KanjiInfo[]>;
    public readonly skeletons: number[];
    public readonly route: ActivatedRoute | null;
    public readonly radicalSearchOptions$: Observable<SelectValue<IRadicalSearchOption | null>[]>;
    public readonly radicalControl: FormControl<IRadicalSearchOption[]>;

    constructor(
        public readonly activatedRoute: ActivatedRoute,
        private readonly radicalSearchOptionService: RadicalSearchOptionService,
        private readonly kanjiInfoService: KanjiService,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {
        this.radicalSearchOptions$ = this.radicalSearchOptionService.getRadicalSearchOptions().pipe(map(radicals => {
            return radicals.reduce((accumulator, radical) => this.buildSelectItems(accumulator, radical), [] as SelectValue<IRadicalSearchOption | null>[]);
        }));
        this.kanjies$ = EMPTY;
        this.radicalControl = new FormControl();
        this.radicalControl.patchValue([], {emitEvent: false})
        this.skeletons = Array.from({length: 21}, (_, i) => i);
        this.route = this.activatedRoute.parent;
    }

    public ngOnInit(): void {
        this.radicalControl.valueChanges.pipe(
            debounceTime(1000)
        ).subscribe(options => {
            console.log(options)
            const radicals: string[] = options.map(option => option.radical);
            this.kanjies$ = of([]);
            this.kanjies$ = this.kanjiInfoService.getKanjiesByRadicals(radicals);
            this.changeDetectorRef.detectChanges();
        });
    }

    private buildSelectItems(
        accumulator: SelectValue<IRadicalSearchOption | null>[],
        radical: IRadicalSearchOption
    ): SelectValue<IRadicalSearchOption | null>[] {
        if (!accumulator.length) {
            return [
                ...accumulator,
                {label: '1', value: null, disabled: true},
                {label: radical.radical, value: radical}
            ]
        }
        const prevItem: SelectValue<IRadicalSearchOption | null> = accumulator[accumulator.length - 1];
        if (prevItem.value && prevItem.value?.strokes !== radical.strokes) {
            return [
                ...accumulator,
                {label: String(radical.strokes), value: null, disabled: true},
                {label: radical.radical, value: radical}
            ];
        }
        return [...accumulator, {label: radical.radical, value: radical}];
    }
}
