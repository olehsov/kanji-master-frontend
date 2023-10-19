import { Component } from '@angular/core';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  public readonly logoPath: string;

  constructor() {
    this.logoPath = environment.logoPath;
  }
}
