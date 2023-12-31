import { Component } from '@angular/core';
import { environment } from "../../../../environments/environment";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  public readonly logoPath: string;
  public readonly menuItems: MenuItem[];

  constructor() {
    this.logoPath = environment.logoPath;
    this.menuItems = [
      { label: 'Home', routerLink: 'home' },
      { label: 'Kanji', routerLink: 'kanji' },
      // { label: 'Flashcards', routerLink: '' },
      // { label: 'Quizzes', routerLink: '' },
      // { label: 'About', routerLink: '' }
    ];
  }
}
