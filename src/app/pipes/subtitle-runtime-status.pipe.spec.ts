import {
  SubtitleRuntimeStatusPipe,
  srtTimeToSeconds,
} from './subtitle-runtime-status.pipe';
import { SubtitleRuntimeStatus } from '../enum/subtitle-runtime-status.enum';
import { subtitle } from '../../testing/kanji-fixtures';

describe('SubtitleRuntimeStatusPipe', () => {
  const pipe = new SubtitleRuntimeStatusPipe();
  const line = subtitle({
    timingStart: '00:00:01,000',
    timingEnd: '00:00:03,500',
  });

  it('parses SRT timestamps', () => {
    expect(srtTimeToSeconds('01:02:03,250')).toBe(3723.25);
  });

  it.each([
    [null, SubtitleRuntimeStatus.NOT_STARTED],
    [0.5, SubtitleRuntimeStatus.NOT_STARTED],
    [2, SubtitleRuntimeStatus.IN_PROGRESS],
    [4, SubtitleRuntimeStatus.COMPLETED],
  ])('time %s -> %s', (time, expected) => {
    expect(pipe.transform(time, line)).toBe(expected);
  });
});
