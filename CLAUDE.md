# Kanji Master — frontend

Learning app for Japanese: users browse and study **kanji** (meanings, readings, stroke order, example words), find kanji **by radicals**, practise **grammar topics** with generated exercises, and study Japanese through **media subtitles** (YouTube now; Spotify and upload are WIP).
The UI language is **Ukrainian** (all user-facing strings). Japanese text gets `lang="ja"`.

Backend: Spring Boot app in `../kanji-master-backend` (GraphQL + REST). Use the `angular-developer` skill (`.claude/skills/`) for Angular questions.

## Stack
- Angular **21** (standalone, **zoneless**, signals), Angular Material/CDK 21, SCSS
- Apollo Angular 13 / `@apollo/client` 4 for GraphQL, `HttpClient` (fetch) for REST
- Vitest 4 + jsdom via `@angular/build:unit-test`; ESLint 9 flat config (`angular-eslint`, `typescript-eslint`); Prettier
- Docker: node 22 build → nginx (`nginx.conf` has the SPA fallback)

## Commands
```bash
npm run start-dev        # dev server on :4200 against http://localhost:8080
npm start                # dev server (default dev configuration)
npm run build            # production build → dist/kanji-master/browser
npm test                 # Vitest, watch mode; CI: npx ng test --watch=false
npm run lint             # ng lint (eslint.config.js)
npm run format           # prettier for src/
```
Before finishing any change, run `npm run build`, `npm run lint` and `npx ng test --watch=false`.

## Structure (`src/app`)
- `app.config.ts`: all providers (zoneless CD, router with component input binding, HttpClient, Apollo). `app.routes.ts`: lazy `loadComponent` routes. No NgModules.
- `pages/<feature>/`: route components (`kanjies` list, `kanji` detail + `kanji-drawing`, `search-kanji-by-radicals`, `studying`, `grammar-topic`, `subtitle-study` + `video-preview/*`).
- `services/`: data access (`providedIn: 'root'`). `queries/`: typed `gql` documents (`TypedDocumentNode<Data, Variables>`). `variables/`: GraphQL variable types.
- `model/kanji-info.model.ts`: `KanjiDto` (API shape), `KanjiInfo` (display shape), and `toKanjiInfo()`, a pure mapper.
- `interfaces/`, `enum/`: DTOs and enums. `pipes/`: pure pipes (exported pure functions are reused in tests).
- `shared/utils/apollo-query.ts`: `apolloQuery()` is the only way services run GraphQL queries. `shared/utils/youtube-api.ts` lazy-loads the YouTube IFrame API.
- `shared/const/kanji-vg-keys.const.ts`: huge generated map (kanji → KanjiVG SVG file in `src/assets/kanji`). Don't edit it by hand; it's ignored by lint and Prettier. Only import it from lazy code (`KanjiVgService`), never from the initial bundle.
- `src/global.d.ts`: `window` globals from third-party scripts (YT, Spotify). `src/testing/`: test fixtures.

## Backend contract
- `environment.apiUrl` (`src/environments/`): dev `http://localhost:8080`, prod Cloud Run URL.
- GraphQL `POST {apiUrl}/graphql`: `getKanjis(page,size,filter)`, `getKanji(kanji)`, `getKanjiesByRadical(radicals)`, `getRadicalSearchOptionDto`, `getAllTopics`, `getTopicTask(topicId,settings)`, `getSentencesByKanji(...)`.
- REST: `POST {apiUrl}/api/subtitle/extract-youtube-video` `{youtubeUrl}`, `POST {apiUrl}/pdf/kanji-practice` (KanjiFilter → PDF blob).
- The JLPT filter sends labels like `N1 (advanced)` (`JLPT_ITEMS` label), not `JLPT1`. Keep that contract.

## Angular rules (follow in every change)
- **Standalone only**. Never add NgModules or `standalone: false`. Each component imports exactly what its template uses (individual Material components, not `*Module` bundles).
- **Zoneless + OnPush**: every component uses `ChangeDetectionStrategy.OnPush` (lint-enforced). Template state must be a signal (or `async`/`rxResource` value); a plain field mutated from a callback will not re-render. Never call `detectChanges()`/`markForCheck()` as a fix. Don't add `zone.js` or `NgZone`.
- **Signals**: `signal`/`computed` for state; `input()` / `input.required()` / `output()` / `viewChild()`. No `@Input`/`@Output`/`@ViewChild` decorators. Route params arrive as `input()` (`withComponentInputBinding`).
- **Data loading**: `rxResource({ params, stream })` for load-on-param data, using `isLoading()`, `error()`, `hasValue()` in the template. Always render an error state (`.load-error`, `role="alert"`); never leave a spinner running forever.
- **DI**: `inject()` in field initializers, no constructor parameters.
- **RxJS**: every manual `subscribe` gets `takeUntilDestroyed()`. Don't touch RxJS internals (`_value` etc.). Prefer `switchMap` for request cancellation.
- **Templates**: native control flow (`@if`/`@for` with a real `track`/`@switch`/`@let`), self-closing tags, no expensive calls in templates (precompute with `computed`, a mapper or a pure pipe). `host: {}` instead of `@HostListener`/`@HostBinding`.
- **GraphQL**: add the document to `queries/` with full `TypedDocumentNode` types, call it via `apolloQuery(apollo, DOC, variables, data => data.field)`.
- **Security**: no secrets in this repo (everything ships to the browser). `bypassSecurityTrust*` is only allowed on a value built from a regex-validated ID inside the component (see `SpotifyAudioPreviewComponent`); no generic "safe" pipes. `[innerHTML]` only with Angular's sanitizer (no bypass).
- **A11y**: navigation = `<a routerLink>`, actions = `<button type="button">`, icon-only buttons need `aria-label`. Template accessibility lint rules are on.
- **Style**: Prettier (single quotes, 2 spaces, width 80). No `console.log` (lint allows `console.error`/`warn`). SCSS uses `@use … as *`, never `@import`. Keep `*.component.ts` file naming (don't mass-rename).
- **Tests**: Vitest + TestBed, zoneless "act → `await fixture.whenStable()` → assert". Fake services with `{ provide: X, useValue: … }`. Put pure logic in exported functions and unit-test them.

## Known issues / TODO
- **SECURITY: the Spotify client secret is hardcoded** in `services/spotify.service.ts` and is in git history (commit `15773e14`). Plan: move the client-credentials token exchange to `kanji-master-backend` (e.g. `GET /api/spotify/token`), call that from the frontend, delete the secret here, and **rotate it** in the Spotify dashboard. Don't use `SpotifyService` in new code until then.
- WIP features, kept on purpose: `UploadedVideoPreviewComponent` (placeholder), Spotify subtitle sync (`SpotifyService` is not wired up), `SentenceByKanjiComponent` (not used on any page), `KanjiService.downloadKanjiPdf` (no button in the UI yet).
- Initial bundle is ~640 kB (Material + Apollo). The budget warning is at 750 kB.
