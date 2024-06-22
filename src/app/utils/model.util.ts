import {Type} from "@angular/core";

export class ModelUtil {
    private constructor() {
        throw new ReferenceError('ModelUtil cannot be created');
    }

    public static fromObject<T extends {}>(source: any, classType: Type<T>): T {
        const values: string[] = Object.keys(new classType()).map(key => source[key] || null) as string[];
        return new classType(...values);
    }
}