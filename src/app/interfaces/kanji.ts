import {IReading} from "./reading.interface";

export interface Kanji {
    id: number;
    kanji: string;
    grade: number;
    strokeCount?: number | null;
    meanings: string[];
    heisigEn?: string | null;
    kunReadings: IReading[];
    onReadings: IReading[];
    nameReadings: IReading[];
    jlpt: number;
    unicode: string;
    notes: string[];
}