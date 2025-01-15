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
import {StudyingComponent} from "./studying/studying.component";
import {GrammarTopicComponent} from "./grammar-topic/grammar-topic.component";
import {TaskTypeRepresentationPipe} from "../pipes/task-type-representation.pipe";
import {FilterPipe} from "../pipes/filter.pipe";


@NgModule({
    declarations: [
        KanjiesComponent,
        KanjiComponent,
        SearchKanjiByRadicalsComponent,
        StudyingComponent,
        KanjiDrawingComponent,
        SentenceByKanjiComponent,
        GrammarTopicComponent,
        TaskTypeRepresentationPipe,
        FilterPipe
    ],
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
