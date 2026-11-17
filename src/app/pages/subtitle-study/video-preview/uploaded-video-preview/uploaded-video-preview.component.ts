import { ChangeDetectionStrategy, Component } from '@angular/core';

/** WORK IN PROGRESS: study subtitles of an uploaded video file. */
@Component({
  selector: 'app-uploaded-video-preview',
  templateUrl: './uploaded-video-preview.component.html',
  styleUrl: './uploaded-video-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadedVideoPreviewComponent {}
