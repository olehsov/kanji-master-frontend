import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EMPTY, Observable, switchMap, tap} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {LoadingComponent} from "../../shared/abs/loading.component";
import {TopicService} from "../../services/topic.service";
import {GrammarTopic, TaskType} from "../../interfaces/grammar-topic.interface";
import {IGrammarSettingPayload} from "../../interfaces/grammar-setting.payload.interface";

interface GrammarTopicSettings {
    [TaskType.CONVERT_TO_FORMATION]: FormControl<number>;
    [TaskType.TRANSLATE_TO_JAPANESE]: FormControl<number>;
    [TaskType.FILL_IN_THE_BLANKS]: FormControl<number>;
}

@Component({
    selector: 'app-grammar-topic',
    templateUrl: './grammar-topic.component.html',
    styleUrl: './grammar-topic.component.scss'
})
export class GrammarTopicComponent extends LoadingComponent {
    public grammarTopic$: Observable<GrammarTopic> = EMPTY;
    public isSettingOpened: boolean;
    public availableTaskTypes: TaskType[];
    public readonly taskTypes: TaskType[];
    public readonly form: FormGroup<GrammarTopicSettings>;

    constructor(private readonly activatedRoute: ActivatedRoute, private readonly topicService: TopicService) {
        super();
        this.taskTypes = Object.values(TaskType);
        this.availableTaskTypes = [];
        this.isSettingOpened = false;
        this.form = new FormGroup<GrammarTopicSettings>({
            [TaskType.CONVERT_TO_FORMATION]: new FormControl(3),
            [TaskType.TRANSLATE_TO_JAPANESE]: new FormControl(3),
            [TaskType.FILL_IN_THE_BLANKS]: new FormControl(3),
        } as GrammarTopicSettings);

        this.grammarTopic$ = this.getGrammarTopic();
    }

    public formatLabel(value: number): string {
        return `${value}`;
    }

    onToggleChanged($event: MatSlideToggleChange, type: TaskType): void {
        const control: FormControl<number> = this.form.controls[type];
        $event.checked ? control.enable() : control.disable();
    }

    resetGrammars(): void {
        this.grammarTopic$ = this.getGrammarTopic();
    }

    private getGrammarTopic(): Observable<GrammarTopic> {
        const payload: IGrammarSettingPayload[] = Object.entries(this.form.value)
            .map(([type, taskAmount]) => ({type, taskAmount} as IGrammarSettingPayload));
        this._loading$.next(true);
        return this.activatedRoute.params.pipe(
            switchMap(({id}) => this.topicService.getGrammarTopic(Number(id), payload)),
            tap(() => {
                this._loading$.next(false);
                this.availableTaskTypes = payload.map(({type}) => type);
            })
        );
    }
}
