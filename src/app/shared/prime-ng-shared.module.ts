import {NgModule} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {SkeletonModule} from "primeng/skeleton";
import {CardModule} from "primeng/card";


@NgModule({
    imports: [
        ButtonModule,
        SkeletonModule,
        CardModule
    ],
    exports: [
        ButtonModule,
        SkeletonModule,
        CardModule
    ]
})
export class PrimeNgSharedModule {
}
