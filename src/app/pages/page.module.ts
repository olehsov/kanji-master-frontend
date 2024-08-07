import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {ReactiveFormsModule} from "@angular/forms";
import {CustomSharedModule} from "../shared/custom-shared.module";
import {KanjiComponent} from './kanji/kanji.component';
import {KanjiesComponent} from './kanjies/kanjies.component';
import {MaterialSharedModule} from "../shared/material-shared.module";
import {SearchKanjiByRadicalsComponent} from "./search-kanji-by-radicals/search-kanji-by-radicals.component";
import {KanjiDrawingComponent} from "./kanji/kanji-drawing/kanji-drawing.component";
import {SentenceByKanjiComponent} from "./kanji/sentence-by-kanji/sentence-by-kanji.component";


@NgModule({
    declarations: [KanjiesComponent, KanjiComponent, SearchKanjiByRadicalsComponent, KanjiDrawingComponent, SentenceByKanjiComponent],
    imports: [
        CommonModule,
        CustomSharedModule,
        NgOptimizedImage,
        MaterialSharedModule,
        ScrollingModule,
        ReactiveFormsModule
    ]
})
export class PageModule {
}
