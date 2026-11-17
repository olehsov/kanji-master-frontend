# Kanji Master — frontend

A web app for learning Japanese kanji and grammar: a kanji catalogue with filters, kanji details with stroke-order animation, search by radicals, grammar exercises, and study with YouTube subtitles.

Built with Angular 21 (standalone, zoneless, signals), Angular Material and Apollo GraphQL. The backend lives in `../kanji-master-backend`.

## Development

```bash
npm ci
npm run start-dev   # http://localhost:4200, API at http://localhost:8080
```

| Command | What it does |
|---|---|
| `npm run build` | Production build to `dist/kanji-master/browser` |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint (flat config) |
| `npm run format` | Prettier |

## Docker

```bash
docker build -t kanji-master-frontend .
docker run -p 8080:80 kanji-master-frontend
```

See [CLAUDE.md](CLAUDE.md) for the architecture, conventions and known issues.
