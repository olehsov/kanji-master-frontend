import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HomeComponent} from "./home/home.component";
import {PrimeNgSharedModule} from "../shared/prime-ng-shared.module";



@NgModule({
  declarations: [HomeComponent],
    imports: [
        CommonModule,
        NgOptimizedImage,
        PrimeNgSharedModule
    ]
})
export class PageModule { }
