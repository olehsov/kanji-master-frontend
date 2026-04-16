import {provideApollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {inject, NgModule, provideBrowserGlobalErrorListeners} from '@angular/core';
import {InMemoryCache} from '@apollo/client/core';
import {provideHttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

const uri: string = environment.apiUrl + '/graphql'; // <-- add the URL of the GraphQL server here

@NgModule({
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideHttpClient(),

        provideApollo(() => {
            const httpLink = inject(HttpLink);

            return {
                link: httpLink.create({uri}),
                cache: new InMemoryCache(),
            };
        }),
    ],
})
export class GraphQLModule {
}
