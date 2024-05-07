import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HomeComponent} from "./home/home.component";
import {PrimeNgSharedModule} from "../shared/prime-ng-shared.module";
import { KanjiesComponent } from './kanjies/kanjies.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import { KanjiComponent } from './kanji/kanji.component';
import {CustomSharedModule} from "../shared/custom-shared.module";
import {ToggleButtonModule} from "primeng/togglebutton";
import {MultiSelectModule} from "primeng/multiselect";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [HomeComponent, KanjiesComponent, KanjiComponent],
    imports: [
        CommonModule,
        CustomSharedModule,
        NgOptimizedImage,
        PrimeNgSharedModule,
        ScrollingModule,
        ToggleButtonModule,
        MultiSelectModule,
        ReactiveFormsModule,

    ]
})
export class PageModule { }
