import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {NgModule} from '@angular/core';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {environment} from "../environments/environment";

const uri: string = environment.apiUrl + '/graphql'; // <-- add the URL of the GraphQL server here
/**
 *
 * @param httpLink
 */
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
    return {
        link: httpLink.create({uri}),
        cache: new InMemoryCache(),
    };
}

@NgModule({
    exports: [ApolloModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule {
}
