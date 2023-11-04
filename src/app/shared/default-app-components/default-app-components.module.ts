import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TopBarComponent} from "./top-bar/top-bar.component";
import { FooterComponent } from './footer/footer.component';
import {CustomSharedModule} from "../custom-shared.module";
import {PrimeNgSharedModule} from "../prime-ng-shared.module";
import {RouterLink, RouterLinkActive} from "@angular/router";



@NgModule({
  declarations: [
    TopBarComponent,
    FooterComponent
  ],
  exports: [
    TopBarComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        PrimeNgSharedModule,
        RouterLink,
        RouterLinkActive
    ]
})
export class DefaultAppComponentsModule { }
