# Game Hub

A React + Vite app that uses the RAWG API to browse games with filters, search, and theme toggle.

## Features

- Game grid with cards, platform icons, critic scores, and emojis
- Search input with live query updates
- Filter by genre and platform
- Loading spinners and skeletons
- Light/dark theme toggle (CSS variable based)

## Tech Stack

- React 18 + Vite
- TypeScript
- Chakra UI v3
- Axios
- lucide-react (icons)

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Create a .env file in the project root

```bash
VITE_RAWG_API_URL=https://api.rawg.io/api
VITE_RAWG_API_KEY=YOUR_API_KEY
```

3) Run the dev server

```bash
npm run dev
```

## Scripts

- npm run dev
- npm run build
- npm run preview

## Project Structure

- src/components: UI components
- src/hooks: Data fetching hooks
- src/services: Axios client
- src/types.ts: Shared TypeScript types

## Notes

- The RAWG API key is required for all requests.
- If you change env values, restart the dev server.
