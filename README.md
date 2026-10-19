# Movie-pedia

A movie discovery app built with **React** and **TypeScript** on top of [The Movie Database (TMDB) API](https://developer.themoviedb.org/). Browse popular films, search by title, open a details page with a rating chart, and keep a personal favorites list.

Built as the final project for the CommSchool React course.

<!-- Add a screenshot here once deployed: ![Movie-pedia home page](docs/screenshot.png) -->

## Features

- **Popular movies** — the home page loads two pages of TMDB's popular movies in parallel, with a "Load more" button for further pages.
- **Search** — search TMDB by movie title, with a loading state.
- **Movie details** — poster, header and details list, plus a custom SVG circular chart for the TMDB rating. Data is fetched with React Router loaders before the page renders.
- **Favorites** — add and remove favorites (persisted in `localStorage`), with a confirmation modal before removal.
- **Protected routes** — a mock login (session stored in `sessionStorage`) shared through React Context.
- **Reusable components** — form elements, cards, modal and layout, styled with CSS Modules.

## Tech stack

- React 18, TypeScript, Create React App
- React Router (data routers and loaders)
- React Context for auth state
- CSS Modules, react-icons
- TMDB REST API via a small typed `fetch` wrapper (`src/utils/apiCall.ts`)

## Project structure

```
src/
├── pages/        # Home, Movie details, Favorites, Login
├── components/   # Search, cards, details, charts, modal, form elements
├── layout/       # Root layout, header, footer
└── utils/        # Typed API helper, constants, shared types
```

## Getting started

1. Get a free **API Read Access Token** from [TMDB](https://www.themoviedb.org/settings/api).
2. Install and configure:

   ```bash
   git clone https://github.com/TaTamta/movie-pedia.git
   cd movie-pedia
   npm install
   cp .env.example .env.local   # then paste your token into REACT_APP_TMDB_TOKEN
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) and log in with the demo account:

   | Username | Password |
   |---|---|
   | `tamta` | `tamta` |

> The login is a front-end mock for demo purposes; there is no backend. Because this is a client-only app, the TMDB token is included in the browser bundle, so use a read-only token.

## Scripts

| Script | What it does |
|---|---|
| `npm start` | Start the dev server |
| `npm run build` | Production build into `build/` |
| `npm test` | Run tests in watch mode |

## Author

**Tamta Tavartkiladze** — [GitHub](https://github.com/TaTamta)

Movie data and images are provided by [TMDB](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.
