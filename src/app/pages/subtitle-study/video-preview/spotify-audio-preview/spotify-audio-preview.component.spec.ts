import { TestBed } from '@angular/core/testing';
import { SpotifyAudioPreviewComponent } from './spotify-audio-preview.component';

describe('SpotifyAudioPreviewComponent', () => {
  async function render(url: string | null) {
    const fixture = TestBed.createComponent(SpotifyAudioPreviewComponent);
    fixture.componentRef.setInput('url', url);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('embeds a valid track', async () => {
    const element = await render(
      'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC',
    );
    expect(element.querySelector('iframe')?.getAttribute('src')).toBe(
      'https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC',
    );
  });

  it('renders nothing for an invalid URL', async () => {
    const element = await render('https://evil.example.com/track/x');
    expect(element.querySelector('iframe')).toBeNull();
  });
});
