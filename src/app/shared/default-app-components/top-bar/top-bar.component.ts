import {Component} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss'],
    standalone: false
})
export class TopBarComponent {
    public readonly logoPath: string;
    public readonly menuItems: { label: string, routerLink: string }[];

    constructor() {
        this.logoPath = environment.logoPath;
        this.menuItems = [
            {label: 'Канджі', routerLink: 'kanji'},
            {label: 'Навчання', routerLink: 'studying'},
            {label: 'Навчання по субтитрах', routerLink: 'subtitle-study'},
            {label: 'Знайти Канджі по Радикалу', routerLink: 'search-kanji-by-radical'},
        ];
    }
}
