import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TitleCasePipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatProgressBar } from '@angular/material/progress-bar';
import { YOUTUBE_REGEXP } from '../../../../shared/const/regexp.const';
import { VideoSubtitleService } from '../../../../services/video-subtitle.service';
import { SubtitleRuntimeStatusPipe } from '../../../../pipes/subtitle-runtime-status.pipe';
import { SubtitleLineSplitPipe } from '../../../../pipes/subtitle-line-split.pipe';
import { loadYoutubeIframeApi } from '../../../../shared/utils/youtube-api';

/** Minimal surface of `YT.Player` used here. */
interface YoutubePlayer {
  getCurrentTime(): number;
  destroy(): void;
}

const TIME_POLL_MS = 100;

function extractYouTubeId(url: string | null): string | null {
  return url?.match(YOUTUBE_REGEXP)?.[4] ?? null;
}

/** YouTube player with time-synced, word-by-word translated subtitles. */
@Component({
  selector: 'app-youtube-video-preview',
  templateUrl: './youtube-video-preview.component.html',
  styleUrl: './youtube-video-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTooltip,
    MatProgressBar,
    TitleCasePipe,
    SubtitleRuntimeStatusPipe,
    SubtitleLineSplitPipe,
  ],
})
export class YoutubeVideoPreviewComponent {
  private readonly videoSubtitleService = inject(VideoSubtitleService);

  public readonly url = input<string | null>(null);

  protected readonly youtubeId = computed(() => extractYouTubeId(this.url()));
  protected readonly playerReady = signal(false);
  protected readonly currentTime = signal(0);

  protected readonly subtitles = rxResource({
    params: () => this.youtubeId() ?? undefined,
    stream: ({ params }) =>
      this.videoSubtitleService.extractYoutubeVideo(
        `https://www.youtube.com/watch?v=${params}`,
      ),
  });

  private readonly playerHost =
    viewChild.required<ElementRef<HTMLElement>>('playerHost');
  private player: YoutubePlayer | null = null;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    effect((onCleanup) => {
      const videoId = this.youtubeId();
      const host = this.playerHost().nativeElement;
      if (!videoId) {
        return;
      }
      let cancelled = false;
      loadYoutubeIframeApi()
        .then(() => {
          if (!cancelled) {
            this.createPlayer(host, videoId);
          }
        })
        .catch((error: unknown) => console.error(error));
      onCleanup(() => {
        cancelled = true;
        this.destroyPlayer();
      });
    });

    inject(DestroyRef).onDestroy(() => this.destroyPlayer());
  }

  private createPlayer(host: HTMLElement, videoId: string): void {
    // YT.Player replaces its target element, so give it a fresh child each time.
    const target = document.createElement('div');
    host.replaceChildren(target);
    this.player = new window.YT.Player(target, {
      height: '100%',
      width: '100%',
      videoId,
      events: { onReady: () => this.onPlayerReady() },
    }) as YoutubePlayer;
  }

  private onPlayerReady(): void {
    this.playerReady.set(true);
    this.intervalId = setInterval(() => {
      this.currentTime.set(this.player?.getCurrentTime() ?? 0);
    }, TIME_POLL_MS);
  }

  private destroyPlayer(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.player?.destroy();
    this.player = null;
    this.playerReady.set(false);
    this.currentTime.set(0);
  }
}
