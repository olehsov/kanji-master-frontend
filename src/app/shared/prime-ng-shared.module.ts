import {NgModule} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {SkeletonModule} from "primeng/skeleton";
import {CardModule} from "primeng/card";
import {TooltipModule} from "primeng/tooltip";


@NgModule({
    imports: [
        ButtonModule,
        SkeletonModule,
        TooltipModule,
        CardModule
    ],
    exports: [
        ButtonModule,
        SkeletonModule,
        TooltipModule,
        CardModule
    ]
})
export class PrimeNgSharedModule {
}
