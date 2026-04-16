import {Component, Input, NgZone, OnChanges, SimpleChanges} from '@angular/core';
import {SPOTIFY_REGEXP} from "../../../../shared/const/regexp.const";
import {SpotifyService} from "../../../../services/spotify.service";

declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady: () => void;
        Spotify: any;
    }
}

@Component({
    selector: 'app-spotify-audio-preview',
    templateUrl: './spotify-audio-preview.component.html',
    styleUrl: './spotify-audio-preview.component.scss',
    standalone: false
})
export class SpotifyAudioPreviewComponent implements OnChanges {
    @Input() url: string | null = null;
    trackId: string | null = null;
    player: any;
    currentTime = 0;
    duration = 0;

    constructor(private readonly zone: NgZone, private readonly spotifyService: SpotifyService) {
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['url']) {
            if (changes['url'].currentValue) {
                this.trackId = this.extractTrackId(changes['url'].currentValue as string);
                if (this.trackId) {
                    // this.initPlayer();
                    this.spotifyService.getAccessToken().subscribe(a => console.log(a))
                }
                return;
            }
            this.trackId = null;
        }
    }


    private extractTrackId(url: string): string | null {
        const match = url.match(SPOTIFY_REGEXP);
        return match ? match[2] : null;
    }


}
