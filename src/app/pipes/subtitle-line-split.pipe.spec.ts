import { splitSubtitleLine } from './subtitle-line-split.pipe';
import { IIndividualSubtitleTranslationDto } from '../interfaces/individual-subtitle-translation-dto.interface';
import { subtitle } from '../../testing/kanji-fixtures';

function translation(text: string): IIndividualSubtitleTranslationDto {
  return {
    text,
    textHiragana: '',
    meaning: text,
    isWord: true,
    jlpt: 'N5',
  };
}

describe('splitSubtitleLine', () => {
  it('splits a line into translated and plain segments', () => {
    const segments = splitSubtitleLine(
      subtitle({
        line: '私は学生です',
        individualTranslations: [translation('私'), translation('学生')],
      }),
    );
    expect(segments.map((s) => [s.text, s.subtitle !== null])).toEqual([
      ['私', true],
      ['は', false],
      ['学生', true],
      ['です', false],
    ]);
  });

  it('prefers longer phrases over words they contain', () => {
    const segments = splitSubtitleLine(
      subtitle({
        line: '日本人',
        individualTranslations: [translation('日本'), translation('日本人')],
      }),
    );
    expect(segments.map((s) => s.text)).toEqual(['日本人']);
  });

  it('does not mutate the input translations', () => {
    const translations = [translation('a'), translation('abc')];
    splitSubtitleLine(
      subtitle({ line: 'abc a', individualTranslations: translations }),
    );
    expect(translations.map((t) => t.text)).toEqual(['a', 'abc']);
  });

  it('is not confused by digits in the text', () => {
    const segments = splitSubtitleLine(
      subtitle({
        line: '1つ 0',
        individualTranslations: [translation('つ'), translation('0')],
      }),
    );
    expect(segments.map((s) => s.text)).toEqual(['1', 'つ', '0']);
  });
});
