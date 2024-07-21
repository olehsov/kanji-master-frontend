import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {ToggleButtonModule} from "primeng/togglebutton";
import {MultiSelectModule} from "primeng/multiselect";
import {ReactiveFormsModule} from "@angular/forms";
import {CustomSharedModule} from "../shared/custom-shared.module";
import {KanjiComponent} from './kanji/kanji.component';
import {KanjiesComponent} from './kanjies/kanjies.component';
import {PrimeNgSharedModule} from "../shared/prime-ng-shared.module";
import {HomeComponent} from "./home/home.component";
import {SearchKanjiByRadicalsComponent} from "./search-kanji-by-radicals/search-kanji-by-radicals.component";
import {ListboxModule} from "primeng/listbox";
import {KanjiDrawingComponent} from "./kanji/kanji-drawing/kanji-drawing.component";


@NgModule({
    declarations: [HomeComponent, KanjiesComponent, KanjiComponent, SearchKanjiByRadicalsComponent, KanjiDrawingComponent],
    imports: [
        CommonModule,
        CustomSharedModule,
        NgOptimizedImage,
        PrimeNgSharedModule,
        ScrollingModule,
        ToggleButtonModule,
        MultiSelectModule,
        ReactiveFormsModule,
        ListboxModule,
    ]
})
export class PageModule {
}
