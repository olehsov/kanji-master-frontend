import {Pipe, PipeTransform} from '@angular/core';
import {TaskType} from "../interfaces/grammar-topic.interface";

@Pipe({name: 'taskTypeRepresentation'})
export class TaskTypeRepresentationPipe implements PipeTransform {

    transform(value: TaskType): string {
        if (value === TaskType.CONVERT_TO_FORMATION)
            return 'Convert to Formation';
        if (value === TaskType.TRANSLATE_TO_JAPANESE)
            return 'Translate to Japanese';
        if (value === TaskType.FILL_IN_THE_BLANKS)
            return 'Fill in the Blanks';
        return '';
    }

}
