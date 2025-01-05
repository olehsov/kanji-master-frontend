import {ModelUtil} from "../utils/model.util";

export class KanjiInfo {
    public readonly gradePrettified: string;
    public readonly gradeTooltip: string;
    public readonly jlptPrettified: string;
    public readonly jlptTooltip: string;
    public readonly heisigEn: string;

    constructor(
        public readonly kanji?: string,
        public readonly radical?: string,
        public readonly radvar?: string,
        public readonly type?: string,
        public readonly regularOn?: string,
        public readonly regularKun?: string,
        public readonly onyomi?: string,
        public readonly kunyomi?: string,
        public readonly nanori?: string,
        public readonly strokes?: number,
        public readonly grade?: string,
        public readonly jlpt?: string,
        public readonly kanken?: string,
        public readonly frequency?: number,
        public readonly meaning?: string,
        public readonly compactMeaning?: string
    ) {
        this.kanji = kanji;
        this.radical = radical;
        this.radvar = radvar;
        this.type = type;
        this.regularOn = regularOn;
        this.regularKun = regularKun;
        this.onyomi = onyomi;
        this.kunyomi = kunyomi;
        this.nanori = nanori;
        this.strokes = strokes;
        this.grade = grade;
        this.jlpt = jlpt;
        this.kanken = kanken;
        this.frequency = frequency;
        this.meaning = meaning;
        this.compactMeaning = compactMeaning;
        if (grade) {
            this.gradePrettified = this.getValueWithoutBrackets(grade);
            this.gradeTooltip = this.getValueFromBrackets(grade);
        } else {
            this.gradePrettified = this.gradeTooltip = '';
        }
        if (jlpt) {
            this.jlptPrettified = this.getValueWithoutBrackets(jlpt);
            this.jlptTooltip = this.getValueFromBrackets(jlpt);
        } else {
            this.jlptPrettified = this.jlptTooltip = '';
        }
        this.heisigEn = meaning ? meaning.split(';')[0] : '';
    }

    public static fromObject(source: KanjiInfo): KanjiInfo {
        return ModelUtil.fromObject(source, KanjiInfo);
    }

    private getValueWithoutBrackets(value: string): string {
        return value.replace(/\(.*?\)/, '').trim();
    }

    private getValueFromBrackets(value: string): string {
        const parsedValue: RegExpMatchArray | null = value.match(/\((.*?)\)/);
        return parsedValue ? parsedValue[1] : '';
    }
}