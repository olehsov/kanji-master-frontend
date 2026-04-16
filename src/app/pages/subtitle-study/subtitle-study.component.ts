import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {SubtitleMediaType} from "./enum/subtitle-media-type.enum";
import {SPOTIFY_REGEXP, YOUTUBE_REGEXP} from "../../shared/const/regexp.const";

@Component({
    selector: 'app-subtitle-study',
    templateUrl: './subtitle-study.component.html',
    styleUrl: './subtitle-study.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SubtitleStudyComponent {
    public readonly mediaTypes: typeof SubtitleMediaType;
    public readonly mediaTypesValues: SubtitleMediaType[];
    public readonly mediaTypeControl: FormControl<SubtitleMediaType>;
    public readonly mediaControl: FormControl<string | null>;

    constructor() {
        this.mediaTypes = SubtitleMediaType;
        this.mediaTypesValues = Object.values(SubtitleMediaType);
        this.mediaTypeControl = new FormControl<SubtitleMediaType>(SubtitleMediaType.YOUTUBE, {nonNullable: true});
        this.mediaControl = new FormControl<string>('');


        this.updateMediaControlValidators(this.mediaTypeControl.value);
        this.mediaTypeControl.valueChanges
            .subscribe((value: SubtitleMediaType) => this.updateMediaControlValidators(value));

        this.mediaControl.patchValue('https://www.youtube.com/watch?v=qal34e9v_pk');
    }

    private updateMediaControlValidators(value: SubtitleMediaType): void {
        this.mediaControl.reset();
        this.mediaControl.markAsPristine();
        this.mediaControl.markAsUntouched();
        if (value === SubtitleMediaType.YOUTUBE) {
            this.mediaControl.setValidators([Validators.required.bind(Validators), Validators.pattern(YOUTUBE_REGEXP)]);
        } else if (value === SubtitleMediaType.SPOTIFY) {
            this.mediaControl.setValidators([Validators.required.bind(Validators), Validators.pattern(SPOTIFY_REGEXP)]);
        } else {
            this.mediaControl.clearValidators();
        }
        this.mediaControl.updateValueAndValidity();
    }
}
