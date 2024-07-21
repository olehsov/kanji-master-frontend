import {gql} from 'apollo-angular'
import {TypedDocumentNode} from "@apollo/client/core";
import {IRadicalSearchOption} from "../interfaces/radical-search-option.interface";

export const RADICAL_SEARCH_OPTION_QUERY: TypedDocumentNode<{
    getRadicalSearchOptionDto: IRadicalSearchOption[]
}> = gql`
    query {
        getRadicalSearchOptionDto {
            radical
            strokes
            isSimplifiedRadical
        }
    }
`;