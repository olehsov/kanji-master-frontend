import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PageModule} from "./pages/page.module";
import {CustomSharedModule} from "./shared/custom-shared.module";
import {GraphQLModule} from './graphql.module';
import {DefaultAppComponentsModule} from "./shared/default-app-components/default-app-components.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
        AppRoutingModule,
        PageModule,
        CustomSharedModule,
        DefaultAppComponentsModule,
        GraphQLModule
    ],
    providers: []
})
export class AppModule {
}
