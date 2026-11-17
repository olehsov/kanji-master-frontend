import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgTemplateOutlet } from '@angular/common';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatTooltip } from '@angular/material/tooltip';
import { MatProgressBar } from '@angular/material/progress-bar';
import { KanjiService } from '../../services/kanji.service';
import { KanjiVgService } from '../../services/kanji-vg.service';
import { KanjiDrawingComponent } from './kanji-drawing/kanji-drawing.component';

@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrl: './kanji.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KanjiDrawingComponent,
    MatChipListbox,
    MatChipOption,
    MatTooltip,
    NgTemplateOutlet,
    MatProgressBar,
  ],
})
export class KanjiComponent {
  private readonly kanjiService = inject(KanjiService);
  private readonly kanjiVgService = inject(KanjiVgService);

  /** Route param `:id` (the kanji character), bound by the router. */
  public readonly id = input.required<string>();

  protected readonly kanji = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.kanjiService.getKanji(params),
  });

  protected readonly kanjiSvg = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.kanjiVgService.getKanjiSvgContent(params),
  });
}
