import {NgModule} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatHint, MatInput, MatLabel} from "@angular/material/input";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCard, MatCardContent} from "@angular/material/card";


@NgModule({
    imports: [
        MatButton,
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
        MatCard,
        MatCardContent
    ],
    exports: [
        MatButton,
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
        MatCard,
        MatCardContent
    ]
})
export class MaterialSharedModule {
}
