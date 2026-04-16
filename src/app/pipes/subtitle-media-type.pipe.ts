import {Pipe, PipeTransform} from '@angular/core';
import {SubtitleMediaType} from "../pages/subtitle-study/enum/subtitle-media-type.enum";

@Pipe({
    name: 'subtitleMediaType',
    standalone: false
})
export class SubtitleMediaTypePipe implements PipeTransform {

    transform(value: SubtitleMediaType): string {
        if (value === SubtitleMediaType.YOUTUBE)
            return 'Youtube';
        if (value === SubtitleMediaType.SPOTIFY)
            return 'Spotify';
        if (value === SubtitleMediaType.UPLOAD)
            return 'Завантаження';
        return '';
    }

}
