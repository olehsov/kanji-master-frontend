import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {PageModule} from "./pages/page.module";
import {CustomSharedModule} from "./shared/custom-shared.module";
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {DefaultAppComponentsModule} from "./shared/default-app-components/default-app-components.module";

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
