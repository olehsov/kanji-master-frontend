import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RadicalSearchOptionService} from "../../services/radical-search-option.service";
import {debounceTime, EMPTY, map, Observable} from "rxjs";
import {SelectItem} from "primeng/api";
import {IRadicalSearchOption} from "../../interfaces/radical-search-option.interface";
import {FormControl} from "@angular/forms";
import {KanjiInfo} from "../../model/kanji-info.model";
import {KanjiService} from "../../services/kanji.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-search-kanji-by-radicals',
    templateUrl: './search-kanji-by-radicals.component.html',
    styleUrl: './search-kanji-by-radicals.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchKanjiByRadicalsComponent implements OnInit {
    public kanjies$: Observable<KanjiInfo[]>;
    public readonly route: ActivatedRoute | null;
    public readonly radicalSearchOptions$: Observable<SelectItem<IRadicalSearchOption | null>[]>;
    public readonly radicalControl: FormControl<IRadicalSearchOption[]>;

    constructor(
        public readonly activatedRoute: ActivatedRoute,
        private readonly radicalSearchOptionService: RadicalSearchOptionService,
        private readonly kanjiInfoService: KanjiService
    ) {
        this.radicalSearchOptions$ = this.radicalSearchOptionService.getRadicalSearchOptions().pipe(map(radicals => {
            return radicals.reduce((accumulator, radical) => this.buildSelectItems(accumulator, radical), [] as SelectItem<IRadicalSearchOption | null>[]);
        }));
        this.kanjies$ = EMPTY;
        this.radicalControl = new FormControl();
        this.route = this.activatedRoute.parent;
    }

    public ngOnInit(): void {
        this.radicalControl.valueChanges.pipe(
            debounceTime(1000)
        ).subscribe(options => {
            const radicals: string[] = options.map(option => option.radical);
            this.kanjies$ = this.kanjiInfoService.getKanjiesByRadicals(radicals);
        });
    }

    private buildSelectItems(
        accumulator: SelectItem<IRadicalSearchOption | null>[],
        radical: IRadicalSearchOption
    ): SelectItem<IRadicalSearchOption | null>[] {
        if (!accumulator.length) {
            return [
                ...accumulator,
                {label: '1', value: null, disabled: true},
                {label: radical.radical, value: radical}
            ]
        }
        const prevItem: SelectItem<IRadicalSearchOption | null> = accumulator[accumulator.length - 1];
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