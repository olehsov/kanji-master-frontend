import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {take} from "rxjs";
import {YOUTUBE_REGEXP} from "../../../../shared/const/regexp.const";
import {VideoSubtitleService} from "../../../../services/video-subtitle.service";
import {IVideoSubtitleDto} from "../../../../interfaces/video-subtitle-dto.interface";
import {LoadingComponent} from "../../../../shared/abs/loading.component";

// eslint-disable-next-line
declare var YT: any;

@Component({
    selector: 'app-youtube-video-preview',
    templateUrl: './youtube-video-preview.component.html',
    styleUrl: './youtube-video-preview.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeVideoPreviewComponent extends LoadingComponent implements OnChanges {
    @Input() public url: string | null = null;
    public youtubeId?: string;
    public subtitles: IVideoSubtitleDto[] = [];
    public youtubePlayer: any;
    public currentTime: number = 0;
    protected readonly Object = Object;
    private _intervalId: any;

    constructor(private readonly videoSubtitleService: VideoSubtitleService, private readonly changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['url']) {
            if (changes['url'].currentValue) {
                const youtubeId: string | null = this.extractYouTubeId(changes['url'].currentValue as string);
                if (youtubeId) {
                    this.youtubeId = youtubeId;
                    (window as any).onYouTubeIframeAPIReady = () => this.loadPlayer(youtubeId);
                    if ((window as any).YT && (window as any).YT.Player) {
                        this.loadPlayer(youtubeId);
                    }
                    return;
                }
            }
            this.youtubePlayer.destroy();
            this.youtubePlayer = null;
            if (this._intervalId) {
                clearInterval(this._intervalId as number);
                this._intervalId = null;
            }
        }
    }

    private extractYouTubeId(url: string): string | null {
        const match = url.match(YOUTUBE_REGEXP);
        return match ? match[4] : null;
    }

    private loadPlayer(videoId: string): void {
        this.youtubePlayer = new YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId,
            events: {
                'onReady': () => this.onPlayerReady(videoId)
            }
        });
    }

    private onPlayerReady(videoId: string): void {
        this._loading$.next(true);
        this.videoSubtitleService.extractYoutubeVideo(`https://www.youtube.com/watch?v=${videoId}`)
            .pipe(take(1))
            .subscribe(subtitles => {
                this.subtitles = [...subtitles];
                this._loading$.next(false);
                this.changeDetectorRef.detectChanges();
            })

        this._intervalId = setInterval(() => {
            if (this.youtubePlayer && this.youtubePlayer.getCurrentTime) {
                this.currentTime = this.youtubePlayer.getCurrentTime();
                this.changeDetectorRef.detectChanges();
            }
        }, 100);
    }
}
