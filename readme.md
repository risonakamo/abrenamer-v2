# Initialise
1. `pnpm i`
2. In `abrenamer-v2-web`, also `pnpm i`

# Dev
The backend (electron app) and frontend build seperately. Need to keep frontend watcher running.

1. In `abrenamer-v2-web`, `pnpm watch`
2. In app repo (this repo), `pnpm dev`. Need to close and re-run on backend changes.