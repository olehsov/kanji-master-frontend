import {TaskType} from "./grammar-topic.interface";

export interface IGrammarSettingPayload {
    type: TaskType;
    taskAmount: number;
}