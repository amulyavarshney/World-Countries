# World Countries

A responsive React SPA that lets you browse, search, and filter all 250 countries in the world. Built with a glassmorphism UI on a deep gradient background.

## Features

- **Browse** — 250 countries in a responsive grid (1–4 columns), each showing flag, name, population, region, capital, languages, and currency
- **Search** — debounced name search (300 ms) with live results
- **Filter** — by region, language, or currency via dropdown menus
- **Detail view** — full country profile with native name, subregion, TLD, UN membership, language/currency badges, and clickable border-country navigation
- **Dark gradient UI** — glassmorphism cards with `backdrop-blur` on a fixed indigo→purple background
- **Persistent dark mode** — toggle in the navbar, preference saved to `localStorage`

## Tech stack

| Concern | Choice |
|---|---|
| Framework | React 19 |
| Bundler | Vite 8 |
| Routing | React Router v7 |
| State | Context + `useReducer` |
| Styling | Tailwind CSS v4 (utility-first + custom glass utilities) |
| Data | `world-countries` npm package + `flagcdn.com` SVGs, bundled as `public/countries.json` |
| Testing | Vitest + React Testing Library (65 tests) |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run all 65 unit tests (single pass) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint with Oxlint |

## Project structure

```
src/
├── api/countries.js          # All data-access functions (fetchByName, fetchByRegion, …)
├── context/CountriesContext  # Global state: countries list, filter values, loading status
├── hooks/
│   ├── useCountries.js       # Filter-priority logic; wires filters → API calls
│   └── useDebounce.js        # 300 ms debounce for the search input
├── pages/
│   ├── ListPage.jsx          # Route "/" — filter bar + country grid
│   └── DetailPage.jsx        # Route "/country/:cca3" — full country profile
├── components/
│   ├── country/              # CountryCard, CountryGrid, CountryDetail
│   ├── filters/              # SearchBar, RegionFilter, LanguageFilter, CurrencyFilter
│   ├── layout/               # Navbar, PageWrapper
│   └── ui/                   # Badge, LoadingSpinner, ErrorMessage
├── utils/
│   ├── formatters.js         # formatPopulation, formatCurrencies, formatLanguages, …
│   └── constants.js          # REGIONS array, LIST_FIELDS string
└── test/                     # Vitest unit tests + fixtures
public/
└── countries.json            # Generated country dataset (250 entries)
```

## Data source

The original problem statement referenced `restcountries.com/v3.1`, which has since been deprecated and shut down. The app uses an equivalent local dataset generated from:

- **[`world-countries`](https://www.npmjs.com/package/world-countries)** npm package (same field structure as restcountries v3.1) — names, codes, capitals, regions, languages, currencies, borders
- **[flagcdn.com](https://flagcdn.com)** — high-quality SVG country flags served by ISO 2-letter code
- **[samayo/country-json](https://github.com/samayo/country-json)** — population figures

The dataset is pre-built and committed as `public/countries.json`. To regenerate it, run:

```bash
node scripts/build-countries.js
```

> **Note:** The `scripts/` directory and build script are not included in this repo. The pre-built `public/countries.json` is sufficient for development and production.

## Testing

```bash
npm test
```

Runs 65 unit tests across 7 test files covering:

- Utility formatters (`formatters.test.js`)
- API layer — all 6 data-access functions (`api.test.js`)
- `CountryCard` rendering (`CountryCard.test.jsx`)
- `CountryGrid` states — loading, error, empty, success (`CountryGrid.test.jsx`)
- Filter components — `SearchBar`, `RegionFilter` (`filters.test.jsx`)
- `CountryDetail` — all fields, loading/error states, document title (`CountryDetail.test.jsx`)
- `CountriesContext` — state transitions, dispatch, error handling (`context.test.jsx`)

## License

MIT — see [LICENSE](./LICENSE).
