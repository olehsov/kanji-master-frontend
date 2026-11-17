import { KanjiDto } from '../app/model/kanji-info.model';
import { IVideoSubtitleDto } from '../app/interfaces/video-subtitle-dto.interface';

export const KANJI_DTO: KanjiDto = {
  kanji: '人',
  radical: '人',
  strokes: 2,
  grade: 'Kyōiku-Jōyō (1st grade of primary school)',
  jlpt: 'N5 (beginner)',
  meaning: 'person;people;human',
  kunyomi: 'ひと、-り',
  onyomi: 'ジン、ニン',
  words: [
    {
      word: '人',
      yomiDisplay: 'ひと',
      romajiDisplay: 'hito',
      translation: 'person',
    },
    {
      word: '日本人',
      yomiDisplay: 'にほんじん',
      romajiDisplay: 'nihonjin',
      translation: 'Japanese person',
    },
  ],
};

export function subtitle(
  partial: Partial<IVideoSubtitleDto> = {},
): IVideoSubtitleDto {
  return {
    index: 1,
    timingStart: '00:00:01,000',
    timingEnd: '00:00:03,500',
    line: '',
    translation: '',
    kanjies: '',
    grammars: '',
    individualTranslations: [],
    ...partial,
  };
}
