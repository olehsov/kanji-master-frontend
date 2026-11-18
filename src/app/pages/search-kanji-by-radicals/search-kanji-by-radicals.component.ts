import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  rxResource,
  takeUntilDestroyed,
  toSignal,
} from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { KeyValue, KeyValuePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { debounceTime, map } from 'rxjs';
import { RadicalSearchOptionService } from '../../services/radical-search-option.service';
import { IRadicalSearchOption } from '../../interfaces/radical-search-option.interface';
import { KanjiService } from '../../services/kanji.service';
import { SelectValue } from '../../interfaces/select-value';
import { toKanjiTile } from '../../model/kanji-info.model';

type GroupedRadicalsSearchOptions = Record<
  number,
  SelectValue<IRadicalSearchOption>[]
>;

const SELECTION_DEBOUNCE_MS = 1000;

function groupByStrokes(
  radicals: IRadicalSearchOption[],
): GroupedRadicalsSearchOptions {
  const grouped: GroupedRadicalsSearchOptions = {};
  for (const radical of radicals) {
    (grouped[radical.strokes] ??= []).push({
      label: radical.radical,
      value: radical,
    });
  }
  return grouped;
}

/** Find kanji by picking the radicals (components) they contain. */
@Component({
  selector: 'app-search-kanji-by-radicals',
  templateUrl: './search-kanji-by-radicals.component.html',
  styleUrl: './search-kanji-by-radicals.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatButton,
    CdkListbox,
    ReactiveFormsModule,
    CdkOption,
    RouterLink,
    MatProgressBar,
    MatTooltip,
    KeyValuePipe,
  ],
})
export class SearchKanjiByRadicalsComponent {
  private readonly radicalSearchOptionService = inject(
    RadicalSearchOptionService,
  );
  private readonly kanjiService = inject(KanjiService);

  protected readonly radicalControl = new FormControl<IRadicalSearchOption[]>(
    [],
    { nonNullable: true },
  );

  private readonly radicalOptions = rxResource({
    stream: () => this.radicalSearchOptionService.getRadicalSearchOptions(),
  });

  protected readonly groupedRadicals = computed(() =>
    this.radicalOptions.hasValue()
      ? groupByStrokes(this.radicalOptions.value())
      : null,
  );
  protected readonly radicalsError = this.radicalOptions.error;

  /** Selected radical characters, debounced. `undefined` = nothing selected. */
  private readonly selectedRadicals = toSignal(
    this.radicalControl.valueChanges.pipe(
      debounceTime(SELECTION_DEBOUNCE_MS),
      map((options) =>
        options?.length ? options.map((option) => option.radical) : undefined,
      ),
      takeUntilDestroyed(),
    ),
  );

  /** Current selection, undebounced, for the "Вибрано" row. */
  protected readonly selected = toSignal(this.radicalControl.valueChanges, {
    initialValue: [] as IRadicalSearchOption[],
  });

  protected readonly kanjies = rxResource({
    params: () => this.selectedRadicals(),
    stream: ({ params }) => this.kanjiService.getKanjiesByRadicals(params),
  });

  /** Result tiles, or `null` while nothing is selected. */
  protected readonly resultTiles = computed(() =>
    this.kanjies.hasValue() && this.selectedRadicals()
      ? this.kanjies.value().map(toKanjiTile)
      : null,
  );

  protected onSettingReset(): void {
    this.radicalControl.reset();
  }

  protected sortNumericKeys(
    a: KeyValue<string, unknown>,
    b: KeyValue<string, unknown>,
  ): number {
    return Number(a.key) - Number(b.key);
  }
}
