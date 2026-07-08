# Vespera Systems - Venture Graph

Venture Graph is a mocked-data exploration app for studying how capital moves through a fictional venture ecosystem.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- React Three Fiber / three.js
- Zustand
- Local JSON-like TypeScript seed data

## What is included

- Home page with premium dark hero and CTA
- Full-screen graph page with:
  - interactive graph canvas
  - left filter panel
  - top search bar and summary stats
  - right detail panel for selected nodes
- About page describing the Vespera Systems thesis
- Reusable graph component powered by React Three Fiber
- Seed dataset with:
  - 20 companies
  - 10 investors
  - 15 founders
  - 5 universities
  - 8 sectors
  - 112 relationship edges

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
src/
  app/
    about/
    map/
  components/
    market-graph/
    site/
  data/
    venture-seed.ts
  lib/
    market-graph.ts
  store/
    use-market-graph-store.ts
  types/
    venture.ts
```

## Notes on the data

All companies, investors, founders, universities, and relationships are fictional sample data created for interface and product exploration only.

## Next steps

1. Replace the mocked dataset with a proper ingestion pipeline and persistent graph store.
2. Add timeline playback so users can watch market structure evolve over time.
3. Introduce richer relationship semantics, graph clustering, and saved views.
4. Add backend APIs, auth, and collaboration once the research workflow stabilises.
