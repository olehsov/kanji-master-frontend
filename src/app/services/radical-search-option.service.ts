import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { RADICAL_SEARCH_OPTION_QUERY } from '../queries/radical-search-options.queries';
import { IRadicalSearchOption } from '../interfaces/radical-search-option.interface';
import { apolloQuery } from '../shared/utils/apollo-query';

@Injectable({ providedIn: 'root' })
export class RadicalSearchOptionService {
  private readonly apollo = inject(Apollo);

  public getRadicalSearchOptions(): Observable<IRadicalSearchOption[]> {
    return apolloQuery(
      this.apollo,
      RADICAL_SEARCH_OPTION_QUERY,
      {},
      (data) => data.getRadicalSearchOptionDto,
    );
  }
}
