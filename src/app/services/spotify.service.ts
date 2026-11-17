import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';

/**
 * Spotify Web API access. WORK IN PROGRESS — not used by the UI yet
 * (the Spotify preview only renders the public embed iframe).
 *
 * TODO(security): The client credentials below are a SECRET and must NOT live
 * in frontend code — everything in this bundle is public. This token exchange
 * will be moved to kanji-master-backend (e.g. GET /api/spotify/token), the
 * frontend will call that endpoint instead, and the secret will be rotated in
 * the Spotify developer dashboard (it is already in git history).
 */
@Injectable({ providedIn: 'root' })
export class SpotifyService {
  private readonly http = inject(HttpClient);
  private loaded = false;

  public getAccessToken(): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      // TODO(security): move to backend, see class comment.
      Authorization:
        'Basic ' +
        btoa(
          `ef853e0ebbde4e239323022c6ba9b580:4ab515e179394be2833e020176d74007`,
        ),
    });
    const body = new HttpParams().set('grant_type', 'client_credentials');

    return this.http
      .post<{ access_token: string }>(
        'https://accounts.spotify.com/api/token',
        body,
        { headers },
      )
      .pipe(map(({ access_token }) => access_token));
  }

  public transferPlaybackHere(deviceId: string): Observable<unknown> {
    const body = { device_ids: [deviceId], play: true };
    return this.getAccessToken().pipe(
      switchMap((token) =>
        this.http.put('https://api.spotify.com/v1/me/player', body, {
          headers: this.bearer(token),
        }),
      ),
    );
  }

  public playTrack(trackId: string): Observable<unknown> {
    const body = { uris: [`spotify:track:${trackId}`] };
    return this.getAccessToken().pipe(
      switchMap((token) =>
        this.http.put('https://api.spotify.com/v1/me/player/play', body, {
          headers: this.bearer(token),
        }),
      ),
    );
  }

  public load(): Observable<void> {
    if (this.loaded || window.Spotify) {
      return of(undefined);
    }
    return new Observable<void>((observer) => {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.onload = () => {
        this.loaded = true;
        observer.next();
        observer.complete();
      };
      script.onerror = () =>
        observer.error(new Error('Failed to load Spotify SDK.'));
      document.body.appendChild(script);
    });
  }

  private bearer(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
}
