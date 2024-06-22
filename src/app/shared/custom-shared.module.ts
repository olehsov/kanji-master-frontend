import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PrimeNgSharedModule} from "./prime-ng-shared.module";



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule,
        RouterLink,
        RouterLinkActive,
        PrimeNgSharedModule,
        BrowserAnimationsModule
    ],
    exports: [
        CommonModule,
        RouterModule,
        RouterLink,
        RouterLinkActive,
        PrimeNgSharedModule
    ]
})
export class CustomSharedModule { }
