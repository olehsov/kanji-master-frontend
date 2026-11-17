import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SPOTIFY_REGEXP } from '../../../../shared/const/regexp.const';

/**
 * Spotify track embed. WORK IN PROGRESS: subtitle sync is not implemented;
 * see SpotifyService for the planned Web API integration.
 */
@Component({
  selector: 'app-spotify-audio-preview',
  templateUrl: './spotify-audio-preview.component.html',
  styleUrl: './spotify-audio-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpotifyAudioPreviewComponent {
  private readonly sanitizer = inject(DomSanitizer);

  public readonly url = input<string | null>(null);

  /** 22-char base62 track id, validated by SPOTIFY_REGEXP. */
  protected readonly trackId = computed(() => {
    const match = this.url()?.match(SPOTIFY_REGEXP);
    return match?.[2] ?? match?.[4] ?? null;
  });

  /** Only a regex-validated track id is ever trusted as a resource URL. */
  protected readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const trackId = this.trackId();
    return trackId
      ? this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://open.spotify.com/embed/track/${trackId}`,
        )
      : null;
  });
}
