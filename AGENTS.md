# Project Conventions & Deployment Guidelines

## GitHub Pages Deployment Rules
- **Static Export Configuration**: When deploying Next.js to GitHub Pages, always configure `output: 'export'`, `trailingSlash: true`, and dynamic `basePath` in `next.config.ts`.
- **404 Handling**: Always provide a dedicated `app/not-found.tsx` so static export completes without internal routing errors.
- **Workflow Reliability**: In `.github/workflows/deploy.yml`:
  - Use Node 22 (`actions/setup-node@v4` with `node-version: "22"`).
  - Do not enable strict lockfile cache (`cache: "npm"`) unless a lockfile is guaranteed, or always generate and commit `package-lock.json`.
  - Ensure `npm install --legacy-peer-deps` is used to prevent dependency resolution conflicts.
- **Asset Integrity**: Always maintain `public/.nojekyll` so GitHub Pages serves `_next` asset bundles without 404 errors.
- **Error Resolution**: Always proactively diagnose build/export logs, identify missing files or misconfigurations, and deliver fully working, zero-error deployments.
