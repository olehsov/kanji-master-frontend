import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TopicService } from '../../services/topic.service';
import { Task, TaskType } from '../../interfaces/grammar-topic.interface';
import { IGrammarSettingPayload } from '../../interfaces/grammar-setting.payload.interface';
import { TaskTypeRepresentationPipe } from '../../pipes/task-type-representation.pipe';

type GrammarTopicSettings = Record<TaskType, FormControl<number>>;

const DEFAULT_TASK_AMOUNT = 3;

/** Grammar topic: explanation, examples and generated exercises. */
@Component({
  selector: 'app-grammar-topic',
  templateUrl: './grammar-topic.component.html',
  styleUrl: './grammar-topic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconButton,
    MatIcon,
    ReactiveFormsModule,
    MatSlider,
    MatSliderThumb,
    MatSlideToggle,
    MatButton,
    NgTemplateOutlet,
    RouterLink,
    MatTabGroup,
    MatTab,
    MatFormField,
    MatInput,
    MatProgressBar,
    TaskTypeRepresentationPipe,
  ],
})
export class GrammarTopicComponent {
  private readonly topicService = inject(TopicService);

  /** Route param `:id`, bound by the router. */
  public readonly id = input.required({ transform: numberAttribute });

  protected readonly taskTypes: TaskType[] = Object.values(TaskType);
  protected readonly isSettingOpened = signal(false);
  protected readonly form = new FormGroup<GrammarTopicSettings>({
    [TaskType.CONVERT_TO_FORMATION]: this.amountControl(),
    [TaskType.TRANSLATE_TO_JAPANESE]: this.amountControl(),
    [TaskType.FILL_IN_THE_BLANKS]: this.amountControl(),
  });

  /** Settings sent to the backend; updated when "apply" is pressed. */
  private readonly settings = signal<IGrammarSettingPayload[]>(
    this.readSettings(),
  );

  protected readonly grammarTopic = rxResource({
    params: () => ({ id: this.id(), settings: this.settings() }),
    stream: ({ params }) =>
      this.topicService.getGrammarTopic(params.id, params.settings),
  });

  protected readonly tasksByType = computed(() => {
    const tasks = this.grammarTopic.hasValue()
      ? this.grammarTopic.value().tasks
      : [];
    const byType = new Map<TaskType, Task[]>();
    for (const task of tasks) {
      byType.set(task.taskType, [...(byType.get(task.taskType) ?? []), task]);
    }
    return byType;
  });

  /** Task types with at least one exercise in the loaded lesson, in display order. */
  protected readonly availableTaskTypes = computed(() =>
    this.taskTypes.filter((type) => this.tasksByType().has(type)),
  );

  /** User answers for tasks that were already checked. */
  protected readonly checkedAnswers = signal(new Map<Task, string>());

  protected formatLabel(value: number): string {
    return `${value}`;
  }

  protected onToggleChanged(event: MatSlideToggleChange, type: TaskType): void {
    const control = this.form.controls[type];
    if (event.checked) {
      control.enable();
    } else {
      control.disable();
    }
  }

  protected applySettings(): void {
    this.checkedAnswers.set(new Map());
    this.settings.set(this.readSettings());
  }

  protected checkAnswer(task: Task, answer: string): void {
    this.checkedAnswers.update((answers) =>
      new Map(answers).set(task, answer.trim()),
    );
  }

  private amountControl(): FormControl<number> {
    return new FormControl(DEFAULT_TASK_AMOUNT, { nonNullable: true });
  }

  /**
   * Enabled task types only. Read the controls directly: once every control
   * is disabled the group is disabled too and `form.value` lists all of them
   * again. With every type switched off this sends `[]`, and the backend
   * returns a lesson without exercises.
   */
  private readSettings(): IGrammarSettingPayload[] {
    return this.taskTypes
      .filter((type) => this.form.controls[type].enabled)
      .map((type) => ({
        type,
        taskAmount: this.form.controls[type].value,
      }));
  }
}
