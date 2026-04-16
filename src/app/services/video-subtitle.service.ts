import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ISubtitleWrapDto} from "../interfaces/subtitle-wrap-dto.interface";
import {IVideoSubtitleDto} from "../interfaces/video-subtitle-dto.interface";

@Injectable({
    providedIn: 'root'
})
export class VideoSubtitleService {
    private readonly uri: string;

    constructor(private readonly http: HttpClient) {
        this.uri = environment.apiUrl + '/api/subtitle';
    }


    public extractYoutubeVideo(youtubeUrl: string): Observable<IVideoSubtitleDto[]> {
        return this.http.post<ISubtitleWrapDto>(this.uri + '/extract-youtube-video', {youtubeUrl}).pipe(
            map((response: ISubtitleWrapDto) => response.subtitles)
        );
    }

}
