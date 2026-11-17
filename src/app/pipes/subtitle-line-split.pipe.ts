import { Pipe, PipeTransform } from '@angular/core';
import { IVideoSubtitleDto } from '../interfaces/video-subtitle-dto.interface';
import { IIndividualSubtitleTranslationDto } from '../interfaces/individual-subtitle-translation-dto.interface';

export interface SubtitleSegment {
  /** Translation for a known word/phrase; `null` for plain text. */
  subtitle: IIndividualSubtitleTranslationDto | null;
  text: string;
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Splits a subtitle line into plain-text and translated segments. */
export function splitSubtitleLine(
  subtitle: IVideoSubtitleDto,
): SubtitleSegment[] {
  // Copy before sorting: never mutate the input DTO. Longest first, so that
  // longer phrases win over words they contain.
  const translations = [...subtitle.individualTranslations]
    .filter((translation) => translation.text)
    .sort((a, b) => b.text.length - a.text.length);
  if (!translations.length) {
    const text = subtitle.line.trim();
    return text ? [{ subtitle: null, text }] : [];
  }

  const byText = new Map(translations.map((t) => [t.text, t]));
  // Single pass: a capturing group keeps the matched phrases in the result.
  const pattern = new RegExp(
    `(${translations.map((t) => escapeRegExp(t.text)).join('|')})`,
  );

  return subtitle.line
    .split(pattern)
    .map((part, i): SubtitleSegment => {
      // Odd positions are always captured (translated) phrases.
      const translation = i % 2 === 1 ? byText.get(part) : undefined;
      return translation
        ? { subtitle: translation, text: translation.text }
        : { subtitle: null, text: part.trim() };
    })
    .filter((segment) => segment.subtitle !== null || segment.text !== '');
}

@Pipe({ name: 'subtitleLineSplit' })
export class SubtitleLineSplitPipe implements PipeTransform {
  public transform(subtitle: IVideoSubtitleDto): SubtitleSegment[] {
    return splitSubtitleLine(subtitle);
  }
}
