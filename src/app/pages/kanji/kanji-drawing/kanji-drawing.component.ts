import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import anime from 'animejs';

@Component({
    selector: 'app-kanji-drawing',
    templateUrl: './kanji-drawing.component.html',
    styleUrl: './kanji-drawing.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanjiDrawingComponent implements AfterViewInit {
    @Input() public kanjiSvgContent?: string;
    @ViewChild('drawingContainer', {static: true}) public drawingContainer?: ElementRef<Element>;

    public ngAfterViewInit(): void {
        if (this.drawingContainer?.nativeElement) {
            this.drawingContainer.nativeElement.innerHTML = this.kanjiSvgContent as string;
        }
    }

    public runAnimation(): void {
        if (this.drawingContainer?.nativeElement) {
            const paths = this.drawingContainer.nativeElement.querySelectorAll('path');
            paths.forEach((path: any, index: number) => {
                const length = path.getTotalLength();
                path.setAttribute('stroke-dasharray', length.toString());
                path.setAttribute('stroke-dashoffset', length.toString());
                path.setAttribute('stroke', 'black');
                path.setAttribute('stroke-width', '5');
                path.setAttribute('fill', 'none');

                anime({
                    targets: path,
                    strokeDashoffset: [length, 0],
                    easing: 'easeInOutSine',
                    duration: 1000,
                    delay: index * 500
                });
            });
        }
    }
}
