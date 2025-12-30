import { TestBed } from '@angular/core/testing';

import { VideoSubtitleService } from './video-subtitle.service';

describe('VideoSubtitleService', () => {
  let service: VideoSubtitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoSubtitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
