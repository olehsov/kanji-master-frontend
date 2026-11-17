import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TopicService } from '../../services/topic.service';

/** List of grammar topics. */
@Component({
  selector: 'app-studying',
  templateUrl: './studying.component.html',
  styleUrl: './studying.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatButton,
    RouterLink,
    MatProgressBar,
  ],
})
export class StudyingComponent {
  private readonly topicService = inject(TopicService);

  protected readonly topics = rxResource({
    stream: () => this.topicService.getAllTopics(),
  });
}
