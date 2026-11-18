import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  catchError,
  debounceTime,
  EMPTY,
  finalize,
  map,
  Subject,
  switchMap,
} from 'rxjs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { KanjiService } from '../../services/kanji.service';
import { KanjiDto, toKanjiTile } from '../../model/kanji-info.model';
import { KanjiFilter } from '../../interfaces/kanji-filter';
import { GRADE_ITEMS, JLPT_ITEMS } from './consts/form-filter.const';

const BATCH_SIZE = 75;
const SCROLL_THRESHOLD_PX = 250;
const FILTER_DEBOUNCE_MS = 1000;

/** Kanji catalogue with filters and infinite scroll. */
@Component({
  selector: 'app-kanjies',
  templateUrl: './kanjies.component.html',
  styleUrl: './kanjies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()' },
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatChipListbox,
    MatChipOption,
    RouterLink,
    MatProgressBar,
    MatButton,
  ],
})
export class KanjiesComponent {
  private readonly kanjiService = inject(KanjiService);

  protected readonly jlpt = JLPT_ITEMS;
  protected readonly grades = GRADE_ITEMS;
  protected readonly form = inject(NonNullableFormBuilder).group({
    jlpt: [[] as string[]],
    grade: [[] as string[]],
    search: [''],
  });

  protected readonly kanjies = signal<KanjiDto[]>([]);
  protected readonly tiles = computed(() => this.kanjies().map(toKanjiTile));
  protected readonly loading = signal(false);
  protected readonly error = signal(false);
  private readonly last = signal(false);
  private currentPage = 0;
  private readonly pageRequests = new Subject<number>();

  constructor() {
    this.pageRequests
      .pipe(
        switchMap((page) => {
          this.loading.set(true);
          this.error.set(false);
          return this.kanjiService
            .getPage(page, BATCH_SIZE, this.getFilter())
            .pipe(
              map((result) => ({ page, result })),
              catchError(() => {
                this.error.set(true);
                return EMPTY;
              }),
              finalize(() => this.loading.set(false)),
            );
        }),
        takeUntilDestroyed(),
      )
      .subscribe(({ page, result }) => {
        this.kanjies.update((list) =>
          page === 0 ? result.content : [...list, ...result.content],
        );
        this.currentPage = result.number;
        this.last.set(result.last);
      });

    this.form.valueChanges
      .pipe(debounceTime(FILTER_DEBOUNCE_MS), takeUntilDestroyed())
      .subscribe(() => this.loadFirstPage());

    this.loadFirstPage();
  }

  protected onScroll(): void {
    if (this.loading() || this.last() || this.error()) {
      return;
    }
    const documentHeight = document.documentElement.scrollHeight;
    const nearBottom =
      window.scrollY + window.innerHeight >=
      documentHeight - SCROLL_THRESHOLD_PX;
    if (nearBottom) {
      this.pageRequests.next(this.currentPage + 1);
    }
  }

  protected loadFirstPage(): void {
    this.kanjies.set([]);
    this.last.set(false);
    this.pageRequests.next(0);
  }

  private getFilter(): KanjiFilter | null {
    const filter = this.form.getRawValue();
    return filter.jlpt.length || filter.grade.length || filter.search
      ? filter
      : null;
  }
}
