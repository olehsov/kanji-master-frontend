import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ITopic } from '../interfaces/topic.interface';
import { GRAMMAR_TOPIC_QUERY, TOPIC_QUERY } from '../queries/topic.queries';
import { GrammarTopic } from '../interfaces/grammar-topic.interface';
import { IGrammarSettingPayload } from '../interfaces/grammar-setting.payload.interface';
import { apolloQuery } from '../shared/utils/apollo-query';

@Injectable({ providedIn: 'root' })
export class TopicService {
  private readonly apollo = inject(Apollo);

  public getAllTopics(): Observable<ITopic[]> {
    return apolloQuery(
      this.apollo,
      TOPIC_QUERY,
      {},
      (data) => data.getAllTopics,
    );
  }

  public getGrammarTopic(
    topicId: number,
    settings: IGrammarSettingPayload[],
  ): Observable<GrammarTopic> {
    return apolloQuery(
      this.apollo,
      GRAMMAR_TOPIC_QUERY,
      { topicId, settings },
      (data) => data.getTopicTask,
    );
  }
}
