import {Pipe, PipeTransform} from '@angular/core';
import {IVideoSubtitleDto} from "../interfaces/video-subtitle-dto.interface";
import {IIndividualSubtitleTranslationDto} from "../interfaces/Iidividual-subtitle-translation-dto.interface";

@Pipe({name: 'subtitleLineSplit'})
export class SubtitleLineSplitPipe implements PipeTransform {

    transform(subtitle: IVideoSubtitleDto): { subtitle: IIndividualSubtitleTranslationDto, text: string }[] {
        let line: string = subtitle.line;
        subtitle.individualTranslations
            .sort((a, b) => b.text.length - a.text.length)
            .forEach((sub, idx: number) => line = line.replaceAll(sub.text, `|{${idx}}|`));

        return line.split('|')
            .filter(item => item.trim() !== '')
            .map(item => {
                if (/{\d+}/.test(item)) {
                    const idx: number = parseInt(item.replace(/[{}]/g, ''), 10);
                    const selectSubtitle: IIndividualSubtitleTranslationDto = subtitle.individualTranslations[idx]
                    return {subtitle: selectSubtitle, text: selectSubtitle.text};
                }
                return {subtitle: null as any, text: item.trim()};
            });
    }

}
