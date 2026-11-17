import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SentenceService } from '../../../services/sentence.service';

const FIRST_PAGE = 1;
const PAGE_SIZE = 15;

/** Example sentences for a kanji. WORK IN PROGRESS — not used in any page yet. */
@Component({
  selector: 'app-sentence-by-kanji',
  templateUrl: './sentence-by-kanji.component.html',
  styleUrl: './sentence-by-kanji.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentenceByKanjiComponent {
  private readonly sentenceService = inject(SentenceService);

  public readonly kanji = input.required<string>();

  protected readonly sentences = rxResource({
    params: () => this.kanji(),
    stream: ({ params }) =>
      this.sentenceService.getSentencePageByKanji(
        FIRST_PAGE,
        PAGE_SIZE,
        params,
      ),
  });
}
