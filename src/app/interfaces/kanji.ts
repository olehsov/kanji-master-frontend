export interface Kanji {
    id: number;
    kanji: string;
    grade: number;
    strokeCount?: number | null;
    meanings: string[];
    heisigEn?: string | null;
    kunReadings: string[];
    onReadings: string[];
    nameReadings: string[];
    jlpt: number;
    unicode: string;
    notes: string[];
}