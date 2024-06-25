import {gql} from 'apollo-angular'
import {TypedDocumentNode} from "@apollo/client/core";
import {Page} from "../interfaces/page";
import {PageVariables} from "../variables/page.variables";
import {FindByKanjiVariables} from "../variables/find-by-kanji.variables";
import {Word} from "../interfaces/kanji-word.interface";
import {KanjiInfo} from "../model/kanji-info.model";

export const KANJI_SHORT_FILTERED_PAGE: TypedDocumentNode<{ getKanjis: Page<KanjiInfo> }, PageVariables> = gql`
    query($page: Int, $size: Int) {
        getKanjis(page: $page, size: $size) {
            content { kanji }
            number
            last
            first
        }
    }
`;

export const KANJI_FIND_BY_ID: TypedDocumentNode<{ getKanji: KanjiInfo }, FindByKanjiVariables> = gql`
    query($kanji: String) {
      getKanji(kanji: $kanji) {
        kanji
        radical
        radvar
        type
        regularOn
        regularKun
        onyomi
        kunyomi
        nanori
        strokes
        grade
        jlpt
        kanken
        frequency
        meaning
        compactMeaning
      }
    }
`;

export const WORD_BY_KANJI_PAGE: TypedDocumentNode<{ getWordsByKanji: Page<Word> }, PageVariables & {
    kanjiId: number
}> = gql`
    query($page: Int, $size: Int, $kanjiId: Int) {
        getWordsByKanji(page: $page, size: $size, kanjiId: $kanjiId) {
            content {
             meanings { glosses }
             variants { written pronounced priorities }
            }
            number
            last
            first
        }
    }
`;