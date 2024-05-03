import { gql } from 'apollo-angular'
import {TypedDocumentNode} from "@apollo/client/core";
import {Page} from "../interfaces/page";
import {Kanji} from "../interfaces/kanji";
import {PageVariables} from "../variables/page.variables";
import {FindByIdVariables} from "../variables/find-by-id.variables";

export const KANJI_SHORT_PAGE: TypedDocumentNode<{ getKanjis: Page<Kanji> }, PageVariables> = gql`
    query($page: Int, $size: Int) {
        getKanjis(page: $page, size: $size) {
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
        kunReadings
        onReadings
        nameReadings
        jlpt
        unicode
        notes
      }
    }
`;