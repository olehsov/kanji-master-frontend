import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HomeComponent} from "./home/home.component";
import {PrimeNgSharedModule} from "../shared/prime-ng-shared.module";
import { KanjiComponent } from './kanji/kanji.component';
import {ScrollingModule} from "@angular/cdk/scrolling";



@NgModule({
  declarations: [HomeComponent, KanjiComponent],
    imports: [
        CommonModule,
        NgOptimizedImage,
        PrimeNgSharedModule,
        ScrollingModule
    ]
})
export class PageModule { }
