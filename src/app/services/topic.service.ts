import {Injectable} from '@angular/core';
import {Observable, of, switchMap, throwError} from "rxjs";
import {Apollo} from "apollo-angular";
import {ITopic} from "../interfaces/topic.interface";
import {TOPIC_QUERY} from "../queries/topic.queries";

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
}
