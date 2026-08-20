# Stacks

A book search app built with React, TypeScript, and a custom debounce
hook, searching the [Open Library API](https://openlibrary.org/developers/api).

**Live demo:** replace with your GitHub Pages URL once deployed.

## Why this project

Search-as-you-type is a good showcase for a few things TypeScript and
React handle well together:

- **A generic, reusable `useDebounce` hook**, typed with a generic
  parameter so it works for any value type, not just strings.
- **Race condition handling**, if you type fast, multiple requests can
  be in flight at once, and a slow earlier response could otherwise
  overwrite a newer one. This is handled with an `AbortController` plus
  a request ID check, not just a debounce delay.
- **Typed API responses**, the shape returned by Open Library is
  declared as an interface, and normalized into a cleaner internal
  `Book` type that the components actually consume.

## Project structure

```
src/
  types.ts                 API response types + normalization
  hooks/
    useDebounce.ts          generic debounce hook
    useBookSearch.ts        fetch, loading/error state, race handling
  components/
    SearchBar.tsx
    BookGrid.tsx
    BookCard.tsx
  App.tsx
  App.css
  index.css                 shared theme variables
```

## Run locally

Requires [Node.js](https://nodejs.org) (18+).

```bash
git clone https://github.com/<your-username>/stacks.git
cd stacks
npm install
npm run dev
```

## Deploy to GitHub Pages

This project has a build step (Vite compiles the TypeScript/React into
static HTML/CSS/JS), so it deploys differently than a plain HTML file:
a GitHub Actions workflow (`.github/workflows/deploy.yml`) builds it
and publishes the result automatically on every push to `main`. You
don't need Node installed locally to deploy, only to develop.

1. Create a GitHub repo named `stacks` (or update `base` in
   `vite.config.ts` to match whatever name you use).
2. Upload all the project files, including the `.github` folder
   (some upload tools hide dotfolders, if yours does, use `git push`
   instead for this one file).
3. Settings, Pages, Source: `GitHub Actions` (not "Deploy from a
   branch", that option doesn't run a build step).
4. Push a commit (or re-upload a file) to trigger the workflow.
   Check the repo's Actions tab to watch it build and deploy.
5. Live at `https://<your-username>.github.io/stacks/` once the
   workflow finishes, usually under a minute.

## License

MIT, see [LICENSE](LICENSE).
