import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TopBarComponent} from "./top-bar/top-bar.component";
import {CustomSharedModule} from "../custom-shared.module";


@NgModule({
    declarations: [
        TopBarComponent
    ],
    exports: [
        TopBarComponent
    ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        CustomSharedModule
    ]
})
export class DefaultAppComponentsModule {
}
