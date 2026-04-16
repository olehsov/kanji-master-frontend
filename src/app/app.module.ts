import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PageModule} from "./pages/page.module";
import {CustomSharedModule} from "./shared/custom-shared.module";
import {GraphQLModule} from './graphql.module';
import {DefaultAppComponentsModule} from "./shared/default-app-components/default-app-components.module";

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        PageModule,
        CustomSharedModule,
        DefaultAppComponentsModule,
        GraphQLModule], providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {
}
