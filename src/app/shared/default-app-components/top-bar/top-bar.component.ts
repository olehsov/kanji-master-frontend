import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../../environments/environment';

interface MenuItem {
  label: string;
  routerLink: string;
}

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, MatButton, RouterLinkActive, RouterLink],
})
export class TopBarComponent {
  protected readonly logoPath = environment.logoPath;
  protected readonly menuItems: MenuItem[] = [
    { label: 'Канджі', routerLink: '/kanji' },
    { label: 'Навчання', routerLink: '/studying' },
    { label: 'Навчання по субтитрах', routerLink: '/subtitle-study' },
    {
      label: 'Знайти Канджі по Радикалу',
      routerLink: '/search-kanji-by-radical',
    },
  ];
}
