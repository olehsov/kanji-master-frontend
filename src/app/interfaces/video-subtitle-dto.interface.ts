import {IIndividualSubtitleTranslationDto} from "./Iidividual-subtitle-translation-dto.interface";

export interface IVideoSubtitleDto {
    index: number;
    timingStart: string;
    timingEnd: string;
    line: string;
    translation: string;
    videoId?: number;
    kanjies: string;
    grammars: string;
    individualTranslations: IIndividualSubtitleTranslationDto[];
}