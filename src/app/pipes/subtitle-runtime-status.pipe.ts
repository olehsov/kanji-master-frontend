import {Pipe, PipeTransform} from '@angular/core';
import {IVideoSubtitleDto} from "../interfaces/video-subtitle-dto.interface";
import {SubtitleRuntimeStatus} from "../enum/subtitle-runtime-status.enum";

@Pipe({
    name: 'subtitleRuntimeStatus',
    standalone: false
})
export class SubtitleRuntimeStatusPipe implements PipeTransform {

    transform(timing: number | null, subtitle: IVideoSubtitleDto): SubtitleRuntimeStatus {
        console.log(timing)
        if (!timing) {
            return SubtitleRuntimeStatus.NOT_STARTED;
        }
        const startTime: number = this.convertToSeconds(subtitle.timingStart);
        const endTime: number = this.convertToSeconds(subtitle.timingEnd);
        if (timing > endTime) {
            return SubtitleRuntimeStatus.COMPLETED;
        }
        if (timing < startTime) {
            return SubtitleRuntimeStatus.NOT_STARTED;
        }
        return SubtitleRuntimeStatus.IN_PROGRESS;
    }

    private convertToSeconds(time: string): number {
        const [hh, mm, ssWithMs]: string[] = time.split(":");
        const [ss, ms]: string[] = ssWithMs.split(",");

        const hours: number = parseInt(hh, 10);
        const minutes: number = parseInt(mm, 10);
        const seconds: number = parseInt(ss, 10);
        const milliseconds: number = parseInt(ms, 10);

        return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
    }
}
