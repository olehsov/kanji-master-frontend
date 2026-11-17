import { Pipe, PipeTransform } from '@angular/core';
import { IVideoSubtitleDto } from '../interfaces/video-subtitle-dto.interface';
import { SubtitleRuntimeStatus } from '../enum/subtitle-runtime-status.enum';

/** Parses an SRT timestamp (`hh:mm:ss,mmm`) into seconds. */
export function srtTimeToSeconds(time: string): number {
  const [hh, mm, ssWithMs = '0'] = time.split(':');
  const [ss, ms = '0'] = ssWithMs.split(',');
  return Number(hh) * 3600 + Number(mm) * 60 + Number(ss) + Number(ms) / 1000;
}

/** Whether a subtitle line is before, at, or after the current play time. */
@Pipe({ name: 'subtitleRuntimeStatus' })
export class SubtitleRuntimeStatusPipe implements PipeTransform {
  public transform(
    timing: number | null,
    subtitle: IVideoSubtitleDto,
  ): SubtitleRuntimeStatus {
    if (!timing) {
      return SubtitleRuntimeStatus.NOT_STARTED;
    }
    if (timing > srtTimeToSeconds(subtitle.timingEnd)) {
      return SubtitleRuntimeStatus.COMPLETED;
    }
    if (timing < srtTimeToSeconds(subtitle.timingStart)) {
      return SubtitleRuntimeStatus.NOT_STARTED;
    }
    return SubtitleRuntimeStatus.IN_PROGRESS;
  }
}
