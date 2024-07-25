import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {ToggleButtonModule} from "primeng/togglebutton";
import {MultiSelectModule} from "primeng/multiselect";
import {ReactiveFormsModule} from "@angular/forms";
import {ListboxModule} from "primeng/listbox";
import {CustomSharedModule} from "../shared/custom-shared.module";
import {KanjiComponent} from './kanji/kanji.component';
import {KanjiesComponent} from './kanjies/kanjies.component';
import {PrimeNgSharedModule} from "../shared/prime-ng-shared.module";
import {HomeComponent} from "./home/home.component";
import {SearchKanjiByRadicalsComponent} from "./search-kanji-by-radicals/search-kanji-by-radicals.component";
import {KanjiDrawingComponent} from "./kanji/kanji-drawing/kanji-drawing.component";
import {SentenceByKanjiComponent} from "./kanji/sentence-by-kanji/sentence-by-kanji.component";
import {FloatLabelModule} from "primeng/floatlabel";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
    declarations: [HomeComponent, KanjiesComponent, KanjiComponent, SearchKanjiByRadicalsComponent, KanjiDrawingComponent, SentenceByKanjiComponent],
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
        FloatLabelModule,
        DropdownModule,
        InputTextModule,
    ]
})
export class PageModule {
}
