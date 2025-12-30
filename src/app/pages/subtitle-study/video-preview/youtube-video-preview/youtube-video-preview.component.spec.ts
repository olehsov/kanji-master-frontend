import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeVideoPreviewComponent } from './youtube-video-preview.component';

describe('YoutubeVideoPreviewComponent', () => {
  let component: YoutubeVideoPreviewComponent;
  let fixture: ComponentFixture<YoutubeVideoPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeVideoPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YoutubeVideoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
