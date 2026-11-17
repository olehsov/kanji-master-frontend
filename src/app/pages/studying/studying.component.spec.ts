import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { StudyingComponent } from './studying.component';
import { TopicService } from '../../services/topic.service';

describe('StudyingComponent', () => {
  function render(getAllTopics: TopicService['getAllTopics']) {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: TopicService, useValue: { getAllTopics } },
      ],
    });
    return TestBed.createComponent(StudyingComponent);
  }

  it('lists topics', async () => {
    const fixture = render(() =>
      of([{ id: '1', header: 'て-form', description: 'd' }]),
    );
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'て-form',
    );
  });

  // Regression: reading resource.value() in the error state throws.
  it('renders an error state when loading fails', async () => {
    const fixture = render(() => throwError(() => new Error('down')));
    await fixture.whenStable();
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('[role="alert"]'),
    ).not.toBeNull();
  });
});
