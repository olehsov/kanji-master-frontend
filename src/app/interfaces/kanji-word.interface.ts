export interface Word {
    id: number;
    variants: Variant[];
    meanings: Meaning[];
}

export interface Meaning {
    id: number;
    glosses: string[]
}
export interface Variant {
    id: number;
    written: string;
    pronounced: string;
    priorities: string[];
}
