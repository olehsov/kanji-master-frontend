import {Component} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
    public readonly logoPath: string;
    public readonly menuItems: { label: string, routerLink: string }[];

    constructor() {
        this.logoPath = environment.logoPath;
        this.menuItems = [
            {label: 'Канжі', routerLink: 'kanji'},
            {label: 'Навчання', routerLink: 'studying'},
            {label: 'Знайти Канжі по Радикалу', routerLink: 'search-kanji-by-radical'},
        ];
    }
}
