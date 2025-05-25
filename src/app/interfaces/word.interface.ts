export interface Word {
    id: string;
    word: string;
    yomiDisplay: string;
    romajiDisplay: string;
    freq: number;
    isSelfSupporting: boolean;
    translation: string;
}