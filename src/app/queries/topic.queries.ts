import {gql} from 'apollo-angular'
import {TypedDocumentNode} from "@apollo/client/core";
import {ITopic} from "../interfaces/topic.interface";
import {GrammarTopic} from "../interfaces/grammar-topic.interface";
import {IGrammarSettingPayload} from "../interfaces/grammar-setting.payload.interface";

export const TOPIC_QUERY: TypedDocumentNode<{ getAllTopics: ITopic[] }, void> = gql`
    query {
        getAllTopics {
            id
            header
            description
        }
    }
`;

export const GRAMMAR_TOPIC_QUERY: TypedDocumentNode<{ getTopicTask: GrammarTopic }, {
    topicId: number,
    settings: IGrammarSettingPayload[]
}> = gql`
    query($topicId: Int, $settings: [GrammarSettingPayload]) {
        getTopicTask(topicId: $topicId, settings: $settings) {
            header
            formation
            exampleSentences {
                sentence
                translation
            }
            tasks {
                taskType
                description
                question
                correctAnswer
                resources
            }
        }
    }
`;