import { Apollo } from 'apollo-angular';
import { OperationVariables, TypedDocumentNode } from '@apollo/client/core';
import { map, Observable } from 'rxjs';

/**
 * Runs a one-shot GraphQL query and emits the selected field of `data`.
 * Errors are re-thrown as `Error` so callers can handle them in `catchError`
 * or via `rxResource`'s error state.
 */
export function apolloQuery<
  TData,
  TVariables extends OperationVariables,
  TResult,
>(
  apollo: Apollo,
  query: TypedDocumentNode<TData, TVariables>,
  variables: TVariables,
  select: (data: TData) => TResult,
): Observable<TResult> {
  return apollo
    .query<TData, TVariables>({ query, variables } as Apollo.QueryOptions<
      TData,
      TVariables
    >)
    .pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        if (!data) {
          throw new Error('Empty GraphQL response');
        }
        return select(data as TData);
      }),
    );
}
