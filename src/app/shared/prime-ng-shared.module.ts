import { NgModule } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {SkeletonModule} from "primeng/skeleton";
import {ChipModule} from "primeng/chip";
import {CardModule} from "primeng/card";
import {TabViewModule} from "primeng/tabview";
import {AccordionModule} from "primeng/accordion";



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
export class PrimeNgSharedModule { }
