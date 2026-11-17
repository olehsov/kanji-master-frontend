import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'kanji',
    title: 'Канджі',
    loadComponent: () =>
      import('./pages/kanjies/kanjies.component').then(
        (m) => m.KanjiesComponent,
      ),
  },
  {
    path: 'kanji/:id',
    loadComponent: () =>
      import('./pages/kanji/kanji.component').then((m) => m.KanjiComponent),
  },
  {
    path: 'studying',
    title: 'Навчання',
    loadComponent: () =>
      import('./pages/studying/studying.component').then(
        (m) => m.StudyingComponent,
      ),
  },
  {
    path: 'studying/:id',
    loadComponent: () =>
      import('./pages/grammar-topic/grammar-topic.component').then(
        (m) => m.GrammarTopicComponent,
      ),
  },
  {
    path: 'subtitle-study',
    title: 'Навчання по субтитрах',
    loadComponent: () =>
      import('./pages/subtitle-study/subtitle-study.component').then(
        (m) => m.SubtitleStudyComponent,
      ),
  },
  {
    path: 'search-kanji-by-radical',
    title: 'Пошук по радикалу',
    loadComponent: () =>
      import('./pages/search-kanji-by-radicals/search-kanji-by-radicals.component').then(
        (m) => m.SearchKanjiByRadicalsComponent,
      ),
  },
  { path: '', redirectTo: 'kanji', pathMatch: 'full' },
  { path: '**', redirectTo: 'kanji' },
];
