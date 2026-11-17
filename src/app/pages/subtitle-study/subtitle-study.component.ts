import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  MatOption,
  MatSelect,
  MatSelectTrigger,
} from '@angular/material/select';
import { map } from 'rxjs';
import { SubtitleMediaType } from './enum/subtitle-media-type.enum';
import {
  SPOTIFY_REGEXP,
  YOUTUBE_REGEXP,
} from '../../shared/const/regexp.const';
import { YoutubeVideoPreviewComponent } from './video-preview/youtube-video-preview/youtube-video-preview.component';
import { SpotifyAudioPreviewComponent } from './video-preview/spotify-audio-preview/spotify-audio-preview.component';
import { UploadedVideoPreviewComponent } from './video-preview/uploaded-video-preview/uploaded-video-preview.component';
import { SubtitleMediaTypePipe } from '../../pipes/subtitle-media-type.pipe';

/** Sample video shown on first open so the page is not empty. */
const DEMO_YOUTUBE_URL = 'https://www.youtube.com/watch?v=qal34e9v_pk';

/** Study Japanese with media subtitles (YouTube, Spotify, upload). */
@Component({
  selector: 'app-subtitle-study',
  templateUrl: './subtitle-study.component.html',
  styleUrl: './subtitle-study.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatError,
    MatSelect,
    MatSelectTrigger,
    NgTemplateOutlet,
    MatOption,
    YoutubeVideoPreviewComponent,
    SpotifyAudioPreviewComponent,
    UploadedVideoPreviewComponent,
    SubtitleMediaTypePipe,
  ],
})
export class SubtitleStudyComponent {
  protected readonly mediaTypes = SubtitleMediaType;
  protected readonly mediaTypesValues = Object.values(SubtitleMediaType);
  protected readonly mediaTypeControl = new FormControl(
    SubtitleMediaType.YOUTUBE,
    { nonNullable: true },
  );
  protected readonly mediaControl = new FormControl<string | null>('');

  protected readonly mediaType = toSignal(this.mediaTypeControl.valueChanges, {
    initialValue: this.mediaTypeControl.value,
  });
  /** Current URL, or `null` while the control is invalid. */
  protected readonly validUrl = toSignal(
    this.mediaControl.statusChanges.pipe(
      map(() => (this.mediaControl.valid ? this.mediaControl.value : null)),
    ),
    { initialValue: null },
  );

  constructor() {
    this.mediaTypeControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => this.updateMediaControlValidators(value));
    this.updateMediaControlValidators(this.mediaTypeControl.value);
    this.mediaControl.setValue(DEMO_YOUTUBE_URL);
  }

  private updateMediaControlValidators(value: SubtitleMediaType): void {
    this.mediaControl.reset();
    if (value === SubtitleMediaType.YOUTUBE) {
      this.mediaControl.setValidators([
        Validators.required,
        Validators.pattern(YOUTUBE_REGEXP),
      ]);
    } else if (value === SubtitleMediaType.SPOTIFY) {
      this.mediaControl.setValidators([
        Validators.required,
        Validators.pattern(SPOTIFY_REGEXP),
      ]);
    } else {
      this.mediaControl.clearValidators();
    }
    this.mediaControl.updateValueAndValidity();
  }
}
