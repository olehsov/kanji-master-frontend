import { gql } from 'apollo-angular'
import {TypedDocumentNode} from "@apollo/client/core";
import {Page} from "../interfaces/page";
import {Kanji} from "../interfaces/kanji";
import {PageVariables} from "../variables/page.variables";
import {FindByIdVariables} from "../variables/find-by-id.variables";
import {KanjiFilter} from "../interfaces/kanji-filter";
import {FilteredPageVariables} from "../variables/filtered-page.variables";
import {Word} from "../interfaces/kanji-word.interface";

export const KANJI_SHORT_FILTERED_PAGE: TypedDocumentNode<{ getKanjis: Page<Kanji> }, FilteredPageVariables<KanjiFilter | null>> = gql`
    query($page: Int, $size: Int, $filter: KanjiFilter) {
        getKanjis(page: $page, size: $size, filter: $filter) {
            content {
              id
              kanji
            }
            number
            last
            first
        }
    }
`;

export const KANJI_FIND_BY_ID: TypedDocumentNode<{ getKanji: Kanji }, FindByIdVariables> = gql`
    query($id: Int) {
      getKanji(id: $id) {
        id
        kanji
        grade
        strokeCount
        meanings
        heisigEn
        kunReadings { reading }
        onReadings { reading }
        nameReadings { reading }
        jlpt
        unicode
        notes
      }
    }
`;

export const WORD_BY_KANJI_PAGE: TypedDocumentNode<{ getWordsByKanji: Page<Word> }, PageVariables & { kanjiId: number}> = gql`
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