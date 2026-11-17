import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { YoutubeVideoPreviewComponent } from './youtube-video-preview.component';
import { VideoSubtitleService } from '../../../../services/video-subtitle.service';

describe('YoutubeVideoPreviewComponent', () => {
  it('does not crash on an invalid URL or on destroy', async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: VideoSubtitleService,
          useValue: { extractYoutubeVideo: () => of([]) },
        },
      ],
    });
    const fixture = TestBed.createComponent(YoutubeVideoPreviewComponent);
    fixture.componentRef.setInput('url', 'not a youtube url');
    await fixture.whenStable();
    fixture.componentRef.setInput('url', null);
    await fixture.whenStable();
    expect(() => fixture.destroy()).not.toThrow();
  });
});
