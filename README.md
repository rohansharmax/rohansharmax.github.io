# Rohan Sharma

Personal site. React + Vite, single page, no runtime dependencies beyond React.

Live at https://rohansharmax.github.io

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`, which is gitignored and built in CI.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages.

Repo Settings → Pages → Source must be set to **GitHub Actions**.

This repo is named `rohansharmax.github.io`, so Pages serves it at the domain root and
`vite.config.js` needs no `base`. Renaming the repo would break every asset path.

## Content

All content traces to `_system/master.md` in the job search folder. Nothing on the page is
claimed that is not verified there.
