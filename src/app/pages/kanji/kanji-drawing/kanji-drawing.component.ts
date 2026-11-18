import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import anime from 'animejs';

const STROKE_DURATION_MS = 1000;
const STROKE_DELAY_MS = 500;

/**
 * Makes a KanjiVG SVG fill its panel and keeps the stroke numbers legible:
 * larger, muted, with a cream halo so they don't merge with the strokes.
 */
export function styleKanjiSvg(svg: SVGSVGElement | null): void {
  if (!svg) {
    return;
  }
  svg.setAttribute('width', '88%');
  svg.setAttribute('height', '88%');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg
    .querySelector('[id^="kvg:StrokePaths"]')
    ?.setAttribute(
      'style',
      'fill:none;stroke:#1c1c1c;stroke-width:3;stroke-linecap:round;stroke-linejoin:round',
    );
  svg
    .querySelector('[id^="kvg:StrokeNumbers"]')
    ?.setAttribute(
      'style',
      'font-size:8px;font-family:Inter,sans-serif;fill:#5f5f5d;' +
        'stroke:#f7f4ed;stroke-width:2.5px;paint-order:stroke;stroke-linejoin:round',
    );
}

/** Renders a KanjiVG SVG and animates its stroke order on click. */
@Component({
  selector: 'app-kanji-drawing',
  templateUrl: './kanji-drawing.component.html',
  styleUrl: './kanji-drawing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, MatIcon],
})
export class KanjiDrawingComponent {
  /** SVG markup from local assets (trusted, loaded by KanjiVgService). */
  public readonly kanjiSvgContent = input.required<string>();
  /** The kanji itself, for the accessible label. */
  public readonly kanji = input('');

  private readonly drawingContainer =
    viewChild.required<ElementRef<HTMLElement>>('drawingContainer');

  constructor() {
    effect(() => {
      const container = this.drawingContainer().nativeElement;
      container.innerHTML = this.kanjiSvgContent();
      styleKanjiSvg(container.querySelector('svg'));
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
      path.setAttribute('stroke', '#1c1c1c');
      path.setAttribute('stroke-width', '3');
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
