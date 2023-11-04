import { NgModule } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {SkeletonModule} from "primeng/skeleton";



@NgModule({
    imports: [
        ButtonModule,
        SkeletonModule
    ],
    exports: [
        ButtonModule,
        SkeletonModule
    ]
})
export class PrimeNgSharedModule { }
