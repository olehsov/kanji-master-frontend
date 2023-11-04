import { gql } from 'apollo-angular'
import {TypedDocumentNode} from "@apollo/client/core";
import {Page} from "../interfaces/page";
import {Kanji} from "../interfaces/kanji";
import {PageVariables} from "../variables/page.variables";

export const KANJI_SHORT_PAGE: TypedDocumentNode<{ getKanjies: Page<Kanji> }, PageVariables> = gql`
    query($page: Int, $size: Int) {
        getKanjies(page: $page, size: $size) {
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