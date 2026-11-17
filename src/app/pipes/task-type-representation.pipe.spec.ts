import { TaskTypeRepresentationPipe } from './task-type-representation.pipe';
import { TaskType } from '../interfaces/grammar-topic.interface';

describe('TaskTypeRepresentationPipe', () => {
  it('has a Ukrainian label for every task type', () => {
    const pipe = new TaskTypeRepresentationPipe();
    for (const type of Object.values(TaskType)) {
      expect(pipe.transform(type)).not.toBe('');
    }
  });
});
