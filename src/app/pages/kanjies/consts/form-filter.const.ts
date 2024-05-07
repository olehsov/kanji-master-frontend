import {SelectItem, SelectItemGroup} from "primeng/api";
import {Jlpt} from "../enums/jlpt.enum";
import {Grade} from "../enums/grade.enum";
import {KanjiFilterSelectedValue} from "../interfaces/kanji-filter-selected-value";


const JLPT_ITEMS: SelectItem<KanjiFilterSelectedValue>[] = Object.entries(Jlpt)
    .map(([key, value]) => ({ label: key, value: { type: 'jlpt', value } }));
const GRADE_ITEMS: SelectItem<KanjiFilterSelectedValue>[] = Object.entries(Grade)
    .map(([key, value]) => ({ label: key, value: { type: 'grade', value } }));

export const KANJI_FILTER_OPTIONS: SelectItemGroup[] = [
    { label: 'JLPT', value: 'jlpt', items: JLPT_ITEMS },
    { label: 'Grade', value: 'us', items: GRADE_ITEMS },
];