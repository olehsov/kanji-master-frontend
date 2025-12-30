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
import {SubtitleStudyComponent} from "./subtitle-study/subtitle-study.component";
import {SubtitleMediaTypePipe} from "../pipes/subtitle-media-type.pipe";
import {
    YoutubeVideoPreviewComponent
} from "./subtitle-study/video-preview/youtube-video-preview/youtube-video-preview.component";
import {
    UploadedVideoPreviewComponent
} from "./subtitle-study/video-preview/uploaded-video-preview/uploaded-video-preview.component";
import {
    SpotifyAudioPreviewComponent
} from "./subtitle-study/video-preview/spotify-audio-preview/spotify-audio-preview.component";
import {SafePipe} from "../pipes/safe.pipe";
import {SubtitleRuntimeStatusPipe} from "../pipes/subtitle-runtime-status.pipe";
import {SubtitleLineSplitPipe} from "../pipes/subtitle-line-split.pipe";


@NgModule({
    declarations: [
        KanjiesComponent,
        KanjiComponent,
        SearchKanjiByRadicalsComponent,
        StudyingComponent,
        KanjiDrawingComponent,
        SentenceByKanjiComponent,
        GrammarTopicComponent,
        SubtitleStudyComponent,
        YoutubeVideoPreviewComponent,
        UploadedVideoPreviewComponent,
        SpotifyAudioPreviewComponent,
        SafePipe,
        TaskTypeRepresentationPipe,
        SubtitleMediaTypePipe,
        FilterPipe,
        SubtitleRuntimeStatusPipe,
        SubtitleLineSplitPipe
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
