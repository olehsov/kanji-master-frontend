export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    sort: Sort | null;
}

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}