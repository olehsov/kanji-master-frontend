import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {map, Observable, of, switchMap} from "rxjs";

declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady: () => void;
        Spotify: any;
    }
}

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {
    private loaded: boolean = false;

    constructor(private http: HttpClient) {
    }

    public getAccessToken(): Observable<string> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(`ef853e0ebbde4e239323022c6ba9b580:4ab515e179394be2833e020176d74007`)
        });

        const body = new HttpParams().set('grant_type', 'client_credentials');


        return this.http.post<{ access_token: string }>('https://accounts.spotify.com/api/token', body, {headers}).pipe(
            map(({access_token}) => access_token)
        );
    }

    public transferPlaybackHere(deviceId: string): Observable<Object> {
        const body: { device_ids: [string], play: boolean } = {device_ids: [deviceId], play: true};

        return this.getAccessToken().pipe(switchMap(token => {
            const headers = new HttpHeaders({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'});
            return this.http.put('https://api.spotify.com/v1/me/player', body, {headers})
        }));
    }

    public playTrack(trackId: string): Observable<any> {
        const body: { uris: [string] } = {uris: [`spotify:track:${trackId}`]};
        return this.getAccessToken().pipe(switchMap(token => {
            const headers = new HttpHeaders({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'});
            return this.http.put('https://api.spotify.com/v1/me/player/play', body, {headers})
        }));
    }

    public load(): Observable<void> {
        if (this.loaded || (window as any).Spotify) {
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

            script.onerror = () => {
                observer.error(new Error('Failed to load Spotify SDK.'));
            };

            document.body.appendChild(script);
        });
    }
}
