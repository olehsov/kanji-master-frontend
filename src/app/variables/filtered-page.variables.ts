import {PageVariables} from "./page.variables";

export interface FilteredPageVariables<T> extends PageVariables {
    filter: T;
}