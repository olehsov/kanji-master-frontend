import {Component} from '@angular/core';
import {Observable, of, tap} from "rxjs";
import {ITopic} from "../../interfaces/topic.interface";
import {TopicService} from "../../services/topic.service";
import {LoadingComponent} from "../../shared/abs/loading.component";

@Component({
    selector: 'app-studying',
    templateUrl: './studying.component.html',
    styleUrl: './studying.component.scss'
})
export class StudyingComponent extends LoadingComponent {
    public topics$: Observable<ITopic[]> = of([]);

    constructor(private readonly topicService: TopicService) {
        super();
        this._loading$.next(true);
        this.topics$ = this.topicService.getAllTopics().pipe(tap(() => this._loading$.next(false)));
    }
}
