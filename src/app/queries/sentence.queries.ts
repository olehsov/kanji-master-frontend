import {TypedDocumentNode} from "@apollo/client/core";
import {gql} from "apollo-angular";
import {Page} from "../interfaces/page";
import {ISentence} from "../interfaces/sentence.interface";
import {SentenceVariables} from "../variables/sentence.variables";

export const SENTENCE_BY_KANJI_PAGE: TypedDocumentNode<{
    getSentencesByKanji: Page<ISentence>
}, SentenceVariables> = gql`
    query($page: Int, $size: Int, $kanji: String) {
        getSentencesByKanji(page: $page, size: $size, kanji: $kanji) {
            content {
                id
                japanese
                english
                particle
                word
                kanji
                furigana
                obi2
            }
            number
            last
            first
        }
    }
`;