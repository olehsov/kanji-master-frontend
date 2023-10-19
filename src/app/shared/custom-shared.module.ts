import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { TopBarComponent } from './default-app-components/top-bar/top-bar.component';
import {DefaultAppComponentsModule} from "./default-app-components/default-app-components.module";
import {ButtonModule} from "primeng/button";



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        DefaultAppComponentsModule
    ],
    exports: [
        DefaultAppComponentsModule,
        ButtonModule
    ]
})
export class CustomSharedModule { }
