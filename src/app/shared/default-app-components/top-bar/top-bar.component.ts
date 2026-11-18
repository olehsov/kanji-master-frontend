import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
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
  imports: [NgOptimizedImage, MatIcon, RouterLinkActive, RouterLink],
  host: { '(document:keydown.escape)': 'closeMenu()' },
})
export class TopBarComponent {
  protected readonly logoPath = environment.logoPath;
  /** Mobile (< 768px) navigation panel state. */
  protected readonly menuOpen = signal(false);
  protected readonly menuItems: MenuItem[] = [
    { label: 'Канджі', routerLink: '/kanji' },
    { label: 'Навчання', routerLink: '/studying' },
    { label: 'Навчання по субтитрах', routerLink: '/subtitle-study' },
    {
      label: 'Знайти Канджі по Радикалу',
      routerLink: '/search-kanji-by-radical',
    },
  ];

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
