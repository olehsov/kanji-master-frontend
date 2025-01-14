import {gql} from 'apollo-angular'
import {TypedDocumentNode} from "@apollo/client/core";
import {ITopic} from "../interfaces/topic.interface";

export const TOPIC_QUERY: TypedDocumentNode<{ getAllTopics: ITopic[] }, void> = gql`
    query {
        getAllTopics {
            id
            header
            description
        }
    }
`;