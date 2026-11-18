import { toKanjiInfo, toKanjiTile } from './kanji-info.model';
import { KANJI_DTO } from '../../testing/kanji-fixtures';

describe('toKanjiInfo', () => {
  it('splits grade and JLPT into display value and tooltip', () => {
    const info = toKanjiInfo(KANJI_DTO);
    expect(info.gradePrettified).toBe('Kyōiku-Jōyō');
    expect(info.gradeTooltip).toBe('1st grade of primary school');
    expect(info.jlptPrettified).toBe('N5');
    expect(info.jlptTooltip).toBe('beginner');
  });

  it('uses the first meaning as the keyword and keeps the rest', () => {
    const info = toKanjiInfo(KANJI_DTO);
    expect(info.heisigEn).toBe('person');
    expect(info.extraMeanings).toEqual(['people', 'human']);
  });

  it('excludes the kanji itself from example words', () => {
    const info = toKanjiInfo(KANJI_DTO);
    expect(info.shortWordList.map((w) => w.word)).toEqual(['日本人']);
  });

  it('keeps zero values and handles missing fields', () => {
    const info = toKanjiInfo({ kanji: '〇', strokes: 0 });
    expect(info.strokes).toBe(0);
    expect(info.gradePrettified).toBe('');
    expect(info.heisigEn).toBe('');
    expect(info.extraMeanings).toEqual([]);
    expect(info.shortWordList).toEqual([]);
  });
});

describe('toKanjiTile', () => {
  it('takes the first meaning and the short JLPT level', () => {
    expect(toKanjiTile(KANJI_DTO)).toEqual({
      kanji: KANJI_DTO.kanji,
      meaning: 'person',
      jlpt: 'N5',
      label: `${KANJI_DTO.kanji} — person`,
    });
  });

  it('falls back to the bare kanji when there is no meaning', () => {
    expect(toKanjiTile({ kanji: '人' })).toEqual({
      kanji: '人',
      meaning: '',
      jlpt: '',
      label: '人',
    });
  });
});
