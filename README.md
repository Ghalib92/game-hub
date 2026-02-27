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
- TanStack React Query v5 (data fetching & caching)
- Axios (HTTP client)
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

## Docker

### Prerequisites

You need **Docker Compose** installed. Check if you have it:

```bash
docker compose version
```

If not installed, install it:
```bash
# Ubuntu/Debian
sudo apt-get update && sudo apt-get install docker-compose-plugin

# Or download the plugin manually
mkdir -p ~/.docker/cli-plugins/
curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose
```

### Quick Start (With Docker Compose)

1) Create a `.env` file in the project root:

```bash
VITE_RAWG_API_URL=https://api.rawg.io/api
VITE_RAWG_API_KEY=YOUR_API_KEY
```

2) Run in development mode (with hot reload):

```bash
docker compose run --rm dev npm install
docker compose up
```

**Or** run in production mode (optimized build with Nginx):

```bash
docker compose -f docker-compose.prod.yml up --build
```

3) Open http://localhost:5173

### Alternative: Without Docker Compose

If you can't install Docker Compose, use the helper scripts:

```bash
# Make scripts executable
chmod +x docker-dev.sh docker-prod.sh

# Install dependencies
./docker-dev.sh "npm install"

# Development mode
./docker-dev.sh

# Production mode
./docker-prod.sh
```

### Why Nginx?

The production mode uses **Nginx** to serve the built Vite app because:
- **SPA Routing**: The `nginx.conf` includes `try_files $uri /index.html` which ensures client-side routes (like `/games` or `/favorites`) work correctly when accessed directly or refreshed
- **Performance**: Nginx is optimized for serving static files with minimal resource usage
- **Production-Ready**: Includes built-in compression, caching, and security features
- **Small Image**: Final Docker image is only ~50-70MB vs 200MB+ with Node.js

### Documentation

For comprehensive Docker documentation including:
- Architecture explanation
- Development vs Production modes
- Troubleshooting guide
- Deployment instructions
- Best practices

📖 **See [DOCKER.md](DOCKER.md)**

## Reusing Docker Files in Other Projects

These Docker files are designed to be **reusable** for any Vite + React project! 

**Files you can copy:**
- `Dockerfile` - Multi-stage build for production
- `docker-compose.yml` - Development with hot reload
- `docker-compose.prod.yml` - Production build
- `nginx.conf` - SPA routing configuration
- `.dockerignore` - Optimizes build context
- `.env.example` - Environment variables template

**What to customize:**
1. Environment variable names in compose files
2. Port numbers (optional)
3. Build output directory if not using Vite

📖 **See [DOCKER.md - Reusing Section](DOCKER.md#reusing-these-docker-files-in-other-projects) for detailed instructions**

## Project Structure

- src/components: UI components
- src/hooks: Data fetching hooks
- src/services: Axios client
- src/types.ts: Shared TypeScript types

## Notes

- The RAWG API key is required for all requests.
- If you change env values, restart the dev server.
