import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyAudioPreviewComponent } from './spotify-audio-preview.component';

describe('SpotifyAudioPreviewComponent', () => {
  let component: SpotifyAudioPreviewComponent;
  let fixture: ComponentFixture<SpotifyAudioPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyAudioPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpotifyAudioPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
