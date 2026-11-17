import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import anime from 'animejs';

const STROKE_DURATION_MS = 1000;
const STROKE_DELAY_MS = 500;

/** Renders a KanjiVG SVG and animates its stroke order on click. */
@Component({
  selector: 'app-kanji-drawing',
  templateUrl: './kanji-drawing.component.html',
  styleUrl: './kanji-drawing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTooltip],
})
export class KanjiDrawingComponent {
  /** SVG markup from local assets (trusted, loaded by KanjiVgService). */
  public readonly kanjiSvgContent = input.required<string>();

  private readonly drawingContainer =
    viewChild.required<ElementRef<HTMLElement>>('drawingContainer');

  constructor() {
    effect(() => {
      this.drawingContainer().nativeElement.innerHTML = this.kanjiSvgContent();
    });
  }

  protected runAnimation(): void {
    const paths =
      this.drawingContainer().nativeElement.querySelectorAll<SVGPathElement>(
        'path',
      );
    paths.forEach((path, index) => {
      const length = path.getTotalLength();
      path.setAttribute('stroke-dasharray', String(length));
      path.setAttribute('stroke-dashoffset', String(length));
      path.setAttribute('stroke', 'black');
      path.setAttribute('stroke-width', '5');
      path.setAttribute('fill', 'none');

      anime({
        targets: path,
        strokeDashoffset: [length, 0],
        easing: 'easeInOutSine',
        duration: STROKE_DURATION_MS,
        delay: index * STROKE_DELAY_MS,
      });
    });
  }
}
