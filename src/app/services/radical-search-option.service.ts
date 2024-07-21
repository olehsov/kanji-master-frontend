import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {Observable, of, switchMap, throwError} from "rxjs";
import {RADICAL_SEARCH_OPTION_QUERY} from "../queries/radical-search-options.queries";
import {IRadicalSearchOption} from "../interfaces/radical-search-option.interface";

@Injectable({
    providedIn: 'root'
})
export class RadicalSearchOptionService {
    constructor(private readonly apollo: Apollo) {
    }

    public getRadicalSearchOptions(): Observable<IRadicalSearchOption[]> {
        return this.apollo.watchQuery({query: RADICAL_SEARCH_OPTION_QUERY}).valueChanges.pipe(
            switchMap(({data, error}) => {
                if (error) {
                    throw throwError(() => error)
                }
                return of(data.getRadicalSearchOptionDto);
            })
        );
    }
}
