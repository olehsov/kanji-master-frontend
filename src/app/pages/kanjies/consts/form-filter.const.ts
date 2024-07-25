import {SelectItem} from "primeng/api";
import {Jlpt} from "../enums/jlpt.enum";
import {Grade} from "../enums/grade.enum";


export const JLPT_ITEMS: SelectItem<string>[] = Object.entries(Jlpt)
    .map(([name, value]) => ({name, value}));
export const GRADE_ITEMS: SelectItem<string>[] = Object.values(Grade)
    .map((value) => ({name: value, value}));


