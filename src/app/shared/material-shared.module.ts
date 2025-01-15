import {NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatHint, MatInput, MatLabel} from "@angular/material/input";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


@NgModule({
    imports: [
        MatButtonModule,
        MatInput,
        MatFormField,
        MatHint,
        MatLabel,
        MatButtonToggleGroup,
        MatButtonToggle,
        MatSelect,
        MatOption,
        MatProgressBar,
        MatIconModule,
        MatChipsModule,
        MatTooltipModule,
        MatCardModule,
        MatListModule,
        MatTabsModule,
        MatSliderModule,
        MatSlideToggleModule
    ],
    exports: [
        MatButtonModule,
        MatInput,
        MatFormField,
        MatHint,
        MatLabel,
        MatButtonToggleGroup,
        MatButtonToggle,
        MatSelect,
        MatOption,
        MatProgressBar,
        MatIconModule,
        MatChipsModule,
        MatTooltipModule,
        MatCardModule,
        MatListModule,
        MatTabsModule,
        MatSliderModule,
        MatSlideToggleModule
    ]
})
export class MaterialSharedModule {
}
