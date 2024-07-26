import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialSharedModule} from "./material-shared.module";
import {CdkListbox, CdkOption} from "@angular/cdk/listbox";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule,
        RouterLink,
        RouterLinkActive,
        MaterialSharedModule,
        BrowserAnimationsModule,
        CdkListbox,
        CdkOption
    ],
    exports: [
        CommonModule,
        RouterModule,
        RouterLink,
        RouterLinkActive,
        MaterialSharedModule,
        CdkListbox,
        CdkOption
    ]
})
export class CustomSharedModule {
}
