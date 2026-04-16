import {Injectable} from '@angular/core';
import {filter, Observable, of, switchMap} from "rxjs";
import {Apollo} from "apollo-angular";
import {ITopic} from "../interfaces/topic.interface";
import {GRAMMAR_TOPIC_QUERY, TOPIC_QUERY} from "../queries/topic.queries";
import {GrammarTopic} from "../interfaces/grammar-topic.interface";
import {IGrammarSettingPayload} from "../interfaces/grammar-setting.payload.interface";

@Injectable({
    providedIn: 'root'
})
export class TopicService {
    constructor(private readonly apollo: Apollo) {
    }

    public getAllTopics(): Observable<ITopic[]> {
        return this.apollo.watchQuery({query: TOPIC_QUERY}).valueChanges.pipe(
            filter((result) => result.dataState === 'complete'),
            switchMap(({data, error}) => {
                if (error) {
                    throw new Error(error.message)
                }
                return of(data.getAllTopics);
            })
        );
    }

    public getGrammarTopic(topicId: number, settings: IGrammarSettingPayload[]): Observable<GrammarTopic> {
        return this.apollo.watchQuery({query: GRAMMAR_TOPIC_QUERY, variables: {topicId, settings}}).valueChanges.pipe(
            filter((result) => result.dataState === 'complete'),
            switchMap(({data, error}) => {
                if (error) {
                    throw new Error(error.message)
                }
                return of(data.getTopicTask);
            })
        );
    }
}
