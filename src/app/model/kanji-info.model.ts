import { KanjiExampleWord } from '../interfaces/kanji-example-word.interface';

/** Raw kanji shape as returned by the GraphQL API. */
export interface KanjiDto {
  kanji: string;
  radical?: string | null;
  radvar?: string | null;
  type?: string | null;
  regularOn?: string | null;
  regularKun?: string | null;
  onyomi?: string | null;
  kunyomi?: string | null;
  nanori?: string | null;
  strokes?: number | null;
  grade?: string | null;
  jlpt?: string | null;
  kanken?: string | null;
  frequency?: number | null;
  meaning?: string | null;
  compactMeaning?: string | null;
  words?: KanjiExampleWord[] | null;
}

/** Kanji enriched with values prepared for display. */
export interface KanjiInfo extends KanjiDto {
  gradePrettified: string;
  gradeTooltip: string;
  jlptPrettified: string;
  jlptTooltip: string;
  /** First meaning (Heisig keyword). */
  heisigEn: string;
  /** Meanings after the first one. */
  extraMeanings: string[];
  /** Up to 5 example words, excluding the kanji itself. */
  shortWordList: KanjiExampleWord[];
}

const MAX_EXAMPLE_WORDS = 5;

function withoutBrackets(value: string): string {
  return value.replace(/\(.*?\)/, '').trim();
}

function fromBrackets(value: string): string {
  return value.match(/\((.*?)\)/)?.[1] ?? '';
}

export function toKanjiInfo(dto: KanjiDto): KanjiInfo {
  const meanings: string[] = dto.meaning ? dto.meaning.split(';') : [];
  return {
    ...dto,
    gradePrettified: dto.grade ? withoutBrackets(dto.grade) : '',
    gradeTooltip: dto.grade ? fromBrackets(dto.grade) : '',
    jlptPrettified: dto.jlpt ? withoutBrackets(dto.jlpt) : '',
    jlptTooltip: dto.jlpt ? fromBrackets(dto.jlpt) : '',
    heisigEn: meanings[0] ?? '',
    extraMeanings: meanings.slice(1),
    shortWordList: (dto.words ?? [])
      .filter((word) => word.word !== dto.kanji)
      .slice(0, MAX_EXAMPLE_WORDS),
  };
}
