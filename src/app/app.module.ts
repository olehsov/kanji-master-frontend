import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {PageModule} from "./pages/page.module";
import {CustomSharedModule} from "./shared/custom-shared.module";
import { GraphQLModule } from './graphql.module';
import {DefaultAppComponentsModule} from "./shared/default-app-components/default-app-components.module";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PageModule,
    CustomSharedModule,
    DefaultAppComponentsModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
