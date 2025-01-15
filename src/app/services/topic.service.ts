import {Injectable} from '@angular/core';
import {Observable, of, switchMap, throwError} from "rxjs";
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
            switchMap(({data, error}) => {
                if (error) {
                    throw throwError(() => error)
                }
                return of(data.getAllTopics);
            })
        );
    }

    public getGrammarTopic(topicId: number, settings: IGrammarSettingPayload[]): Observable<GrammarTopic> {
        return this.apollo.watchQuery({query: GRAMMAR_TOPIC_QUERY, variables: {topicId, settings}}).valueChanges.pipe(
            switchMap(({data, error}) => {
                if (error) {
                    throw throwError(() => error)
                }
                return of(data.getTopicTask);
            })
        );
    }
}
