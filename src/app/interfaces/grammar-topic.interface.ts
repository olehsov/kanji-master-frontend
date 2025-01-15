export interface GrammarTopic {
    header: string;
    formation: string;
    exampleSentences: ExampleSentence[];
    tasks: Task[];
}

export interface ExampleSentence {
    sentence: string;
    translation: string;
}

export interface Task {
    taskType: TaskType;
    description: string;
    question: string;
    correctAnswer: string;
    resources: string[];
}

export enum TaskType {
    CONVERT_TO_FORMATION = "CONVERT_TO_FORMATION",
    TRANSLATE_TO_JAPANESE = "TRANSLATE_TO_JAPANESE",
    FILL_IN_THE_BLANKS = "FILL_IN_THE_BLANKS",
}