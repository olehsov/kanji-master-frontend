import {KanjiFilter} from "../../../interfaces/kanji-filter";

export interface KanjiFilterSelectedValue {
    type: keyof KanjiFilter;
    value: number;
}