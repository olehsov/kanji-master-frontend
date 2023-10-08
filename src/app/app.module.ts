import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {PageModule} from "./pages/page.module";
import {SharedModule} from "primeng/api";
import {CustomSharedModule} from "./shared/custom-shared.module";
import {DefaultAppComponentsModule} from "./shared/default-app-components/default-app-components.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PageModule,
    CustomSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
