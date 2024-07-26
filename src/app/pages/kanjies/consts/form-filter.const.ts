import {Jlpt} from "../enums/jlpt.enum";
import {Grade} from "../enums/grade.enum";
import {SelectValue} from "../../../interfaces/select-value";


export const JLPT_ITEMS: SelectValue<string>[] = Object.entries(Jlpt)
    .map(([value, label]) => ({label, value}));
export const GRADE_ITEMS: string[] = Object.values(Grade);


