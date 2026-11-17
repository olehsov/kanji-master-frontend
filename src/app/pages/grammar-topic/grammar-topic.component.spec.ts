import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GrammarTopicComponent } from './grammar-topic.component';
import { TopicService } from '../../services/topic.service';
import {
  GrammarTopic,
  TaskType,
} from '../../interfaces/grammar-topic.interface';

const LESSON: GrammarTopic = {
  header: 'て-форма',
  formation: '<b>V-て</b>',
  exampleSentences: [{ sentence: '食べて', translation: 'їж' }],
  tasks: [],
};

describe('GrammarTopicComponent', () => {
  async function render(lesson: GrammarTopic) {
    const getGrammarTopic = vi.fn<TopicService['getGrammarTopic']>(() =>
      of(lesson),
    );
    TestBed.configureTestingModule({
      providers: [{ provide: TopicService, useValue: { getGrammarTopic } }],
    });
    const fixture = TestBed.createComponent(GrammarTopicComponent);
    fixture.componentRef.setInput('id', '7');
    await fixture.whenStable();
    return {
      fixture,
      element: fixture.nativeElement as HTMLElement,
      getGrammarTopic,
    };
  }

  it('sends no settings and renders a lesson without exercises when every task type is off', async () => {
    const { fixture, element, getGrammarTopic } = await render(LESSON);

    element.querySelector<HTMLButtonElement>('button.setting')!.click();
    await fixture.whenStable();
    element
      .querySelectorAll<HTMLButtonElement>('mat-slide-toggle button')
      .forEach((toggle) => toggle.click());
    element.querySelector<HTMLButtonElement>('button.reset')!.click();
    await fixture.whenStable();

    expect(getGrammarTopic).toHaveBeenLastCalledWith(7, []);
    expect(element.querySelector('h3')?.textContent).toContain('て-форма');
    expect(element.querySelector('.example-item')).not.toBeNull();
    expect(element.querySelector('mat-tab-group')).toBeNull();
    expect(element.querySelector('.no-tasks')).not.toBeNull();
    expect(element.querySelector('[role="alert"]')).toBeNull();
  });

  it('requests every enabled task type by default', async () => {
    const { getGrammarTopic } = await render(LESSON);
    expect(getGrammarTopic).toHaveBeenCalledWith(
      7,
      Object.values(TaskType).map((type) => ({ type, taskAmount: 3 })),
    );
  });

  it('only shows tabs for task types that came back with exercises', async () => {
    const { element } = await render({
      ...LESSON,
      tasks: [
        {
          taskType: TaskType.FILL_IN_THE_BLANKS,
          description: 'Заповніть пропуск',
          question: '私は＿＿',
          correctAnswer: '食べて',
          resources: [],
        },
      ],
    });

    expect(element.querySelectorAll('[role="tab"]').length).toBe(1);
    expect(element.querySelector('.no-tasks')).toBeNull();
  });
});
