# Docker Documentation for Game Hub

## Overview

This project includes a complete Docker setup with two modes:
- **Development** (`docker-compose.yml`): Hot-reload enabled development server with volume mounting
- **Production** (`docker-compose.prod.yml`): Multi-stage build with Nginx for optimized static file serving

**Compatibility Note:** The setup uses separate compose files instead of profiles to ensure compatibility with all Docker Compose versions (both v1 `docker-compose` and v2 `docker compose`).

## Why Docker?

Docker provides several benefits:
- **Consistency**: Same environment across all machines
- **Isolation**: No Node.js/npm installation required on host
- **Portability**: Easy deployment to any Docker-enabled platform
- **Reproducibility**: Anyone can clone and run with a single command

## Architecture

### Production Build (Nginx + Multi-stage Build)

The production setup uses a **multi-stage Docker build**:

```
Stage 1 (Build): Node.js Alpine → Install deps → Build Vite app → Output to /dist
Stage 2 (Serve): Nginx Alpine → Copy build artifacts → Serve static files
```

**Why Nginx?**

Nginx is used in production for several critical reasons:

1. **Lightweight & Fast**: Nginx is a high-performance web server optimized for serving static files with minimal resource usage (~2-5MB RAM)

2. **SPA Routing Support**: React Router uses client-side routing. When a user directly accesses a route like `/games/123`, the browser requests that path from the server. Without proper configuration, Nginx would return a 404 because that file doesn't exist on disk. The `nginx.conf` file includes:
   ```nginx
   location / {
     try_files $uri /index.html;
   }
   ```
   This tells Nginx: "Try to serve the requested file, but if it doesn't exist, serve `index.html` instead." This allows React Router to handle the routing on the client side.

3. **Production-Grade Serving**: 
   - Automatic GZIP compression
   - Efficient caching headers
   - Security headers
   - Better performance than `vite preview` or Node.js for static files

4. **Small Image Size**: Final Docker image ~50MB vs ~200MB+ with Node.js

5. **Security**: No Node.js runtime in production = reduced attack surface

### Development Mode (Hot Reload)

The development setup uses:
- **Volume Mounting**: Your local source code is mounted into the container
- **Hot Module Replacement (HMR)**: Changes to your code instantly reflect in the browser
- **No Build Step**: Uses Vite's dev server with instant updates

## File Descriptions

### Dockerfile

Multi-stage Dockerfile that:
1. Builds the Vite application with environment variables
2. Copies the built assets to an Nginx container
3. Exposes port 80 for web traffic

**Key Features:**
- Uses `node:20-alpine` for minimal base image
- Accepts build arguments for API configuration
- Leverages Docker layer caching with `package*.json` copy first
- Production-optimized final image with only built assets

### docker-compose.yml

Default development configuration that:
- Uses Node.js Alpine image
- Runs Vite dev server
- Mounts source code as volumes for hot reload
- Exposes port 5173
- Passes environment variables from `.env` file

**Usage:** `docker compose up` (no additional flags needed)

### docker-compose.prod.yml

Production configuration that:
- Builds using the Dockerfile
- Serves optimized build with Nginx
- No volume mounting (uses built assets only)
- Smaller final image size

**Usage:** `docker compose -f docker-compose.prod.yml up --build`

### nginx.conf

Nginx configuration that:
- Listens on port 80
- Serves files from `/usr/share/nginx/html`
- Implements SPA fallback routing with `try_files $uri /index.html`
- Ensures all client-side routes work correctly

**Without this configuration**, navigating to routes like `/games` or `/favorites` would result in 404 errors when accessed directly or refreshed.

### .dockerignore

Prevents unnecessary files from being copied into the Docker build context:
- `node_modules`: Will be installed fresh in container
- `dist`: Build output not needed in build context
- `.git`: Version control history not needed
- `.env`: Environment variables passed via build args

**Benefits:**
- Faster builds (smaller context)
- More secure (doesn't copy sensitive files)
- Prevents conflicts between host and container files

### vite.config.ts Updates

Added server configuration for Docker compatibility:
```typescript
server: {
  host: '0.0.0.0',  // Bind to all interfaces (required for Docker)
  port: 5173,       // Explicit port
  watch: {
    usePolling: true,  // Required for file watching in Docker volumes
  },
}
```

**Why these settings?**
- `host: '0.0.0.0'`: By default, Vite binds to `localhost`, which isn't accessible from outside the container. Binding to `0.0.0.0` allows connections from the host machine.
- `usePolling: true`: File system events don't always propagate correctly through Docker volumes. Polling ensures file changes are detected.

## Usage

### Prerequisites

1. **Docker** installed (version 20.10+)
2. **Docker Compose** installed:
   ```bash
   # Check if installed
   docker compose version
   
   # Install on Ubuntu/Debian
   sudo apt-get update && sudo apt-get install docker-compose-plugin
   
   # Or install manually
   mkdir -p ~/.docker/cli-plugins/
   curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose
   chmod +x ~/.docker/cli-plugins/docker-compose
   ```

3. **Environment variables** in `.env` file:
   ```env
   VITE_RAWG_API_URL=https://api.rawg.io/api
   VITE_RAWG_API_KEY=your_api_key_here
   ```

### Production Mode

Perfect for testing the production build locally or deploying:

```bash
# Build and start
docker compose -f docker-compose.prod.yml up --build

# Run in background
docker compose -f docker-compose.prod.yml up -d --build

# Stop
docker compose -f docker-compose.prod.yml down
```

**Access:** http://localhost:5173

**Characteristics:**
- Optimized build (minified, tree-shaken)
- Served by Nginx
- No hot reload
- ~50-70MB image size

### Development Mode

Perfect for active development with instant feedback:

```bash
# Install dependencies first (one-time setup)
docker compose run --rm dev npm install

# Start dev server
docker compose up

# Stop
docker compose down
```

**Access:** http://localhost:5173

**Characteristics:**
- Hot module replacement (HMR)
- Source maps for debugging
- Instant code updates
- Local files mounted as volumes

### Choosing Between Modes

**Development (default)**: Uses `docker-compose.yml`
```bash
docker compose up
```

**Production**: Uses `docker-compose.prod.yml`
```bash
docker compose -f docker-compose.prod.yml up --build
```

The default `docker-compose.yml` is set to development mode for convenience.

## Common Workflows

### Clone and Run (New Developer)

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd game-hub

# 2. Create .env file
echo "VITE_RAWG_API_URL=https://api.rawg.io/api" >> .env
echo "VITE_RAWG_API_KEY=your_key" >> .env

# 3. Run in development mode
docker compose run --rm dev npm install
docker compose up
```

### Switch Between Modes

```bash
# Development
docker compose up

# Production (in new terminal or after stopping dev)
docker compose -f docker-compose.prod.yml up --build
```

### Rebuild After Dependency Changes

```bash
# Development: reinstall dependencies
docker compose run --rm dev npm install

# Production: rebuild the image
docker compose -f docker-compose.prod.yml up --build
```

### View Logs

```bash
# Development logs
docker compose logs -f

# Production logs
docker compose -f docker-compose.prod.yml logs -f

# View specific service
docker compose logs dev
docker compose -f docker-compose.prod.yml logs web
```

### Clean Up

```bash
# Stop and remove containers
docker compose down

# Remove volumes (careful: deletes node_modules)
docker compose down -v

# Remove images
docker compose down --rmi all
```

## Troubleshooting

### Port 5173 Already in Use

```bash
# Find and kill the process
lsof -ti:5173 | xargs kill -9

# Or change the port in docker-compose.yml
ports:
  - "3000:5173"  # Access via localhost:3000
```

### Hot Reload Not Working (Dev Mode)

1. Ensure `usePolling: true` is set in `vite.config.ts`
2. Verify volumes are mounted correctly
3. Try restarting the container:
   ```bash
   docker compose restart
   ```

### Build Fails Due to Missing Environment Variables

Ensure your `.env` file exists and contains:
```env
VITE_RAWG_API_URL=https://api.rawg.io/api
VITE_RAWG_API_KEY=your_actual_key
```

### Cannot Access App from Browser

1. Check container is running: `docker compose ps`
2. Verify port mapping: `docker compose port web 80` or `docker compose port dev 5173`
3. Ensure firewall allows localhost connections
4. Try `http://127.0.0.1:5173` instead of `localhost`

### npm install Fails in Dev Mode

```bash
# Clear volumes and reinstall
docker compose down -v
docker compose run --rm dev npm install
docker compose up
```

### Image Size Too Large

The production image should be ~50-70MB. If larger:
1. Check `.dockerignore` is properly configured
2. Ensure multi-stage build is working (check Dockerfile `FROM` statements)
3. Verify no extra files in build context: `docker build . --no-cache`

## Deployment

### Deploy to Cloud (Generic)

```bash
# Build for your platform
docker buildx build --platform linux/amd64 \
  --build-arg VITE_RAWG_API_URL=https://api.rawg.io/api \
  --build-arg VITE_RAWG_API_KEY=your_key \
  -t game-hub:latest .

# Tag and push to registry
docker tag game-hub:latest your-registry.com/game-hub:latest
docker push your-registry.com/game-hub:latest
```

### Docker Hub

```bash
docker build -t yourusername/game-hub:latest .
docker push yourusername/game-hub:latest
```

### Recommended Cloud Platforms

- **Fly.io**: `fly launch` (Dockerfile auto-detected)
- **Railway**: Connect GitHub repo, auto-deploys
- **Render**: Docker-based deployments
- **Google Cloud Run**: Supports Docker directly
- **AWS ECS/Fargate**: Container orchestration
- **Heroku**: `heroku container:push web`

## Best Practices

1. **Never commit `.env`**: Sensitive API keys should never be in version control
2. **Use `.dockerignore`**: Keeps builds fast and secure
3. **Multi-stage builds**: Reduces final image size significantly
4. **Development profile**: Keep local workflow smooth with hot reload
5. **Explicit ports**: Avoid port conflicts by being specific
6. **Health checks**: Add them for production deployments
7. **Non-root user**: For enhanced security in production (Nginx already does this)

## Advanced Configuration

### Add Health Check to Dockerfile

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1
```

### Use Custom Nginx Configuration

Edit `nginx.conf` to add:
- Caching headers
- GZIP compression levels
- Security headers (CSP, HSTS)
- Rate limiting

### Multi-Platform Builds

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t game-hub:latest .
```

## Summary

- **Production**: Optimized, Nginx-served, small image, perfect for deployment
- **Development**: Hot reload, volume-mounted, instant feedback, perfect for coding
- **Nginx**: Essential for SPA routing and production-grade static file serving
- **Profiles**: Clean separation between dev and production workflows
- **Portability**: Clone, set `.env`, run one command

## Reusing These Docker Files in Other Projects

These Docker files are designed to be **reusable across any Vite + React project**. Here's how to adapt them:

### Quick Copy Checklist

**✅ Copy these files as-is:**
- `Dockerfile` - Works for any Vite project
- `nginx.conf` - Works for any SPA (React Router, Vue Router, etc.)
- `.dockerignore` - Generic for Node.js projects
- `docker-compose.yml` and `docker-compose.prod.yml` (structure)

**📝 Customize these parts:**

1. **Environment Variables** (if your app needs them):
   ```yaml
   # In docker-compose.yml and docker-compose.prod.yml
   environment:
     - VITE_YOUR_API_URL=${VITE_YOUR_API_URL}
     - VITE_YOUR_KEY=${VITE_YOUR_KEY}
   ```
   
   ```dockerfile
   # In Dockerfile
   ARG VITE_YOUR_API_URL
   ENV VITE_YOUR_API_URL=${VITE_YOUR_API_URL}
   ```

2. **Port** (optional):
   ```yaml
   ports:
     - "3000:5173"  # Access on port 3000 instead of 5173
   ```

3. **Build Script** (if using Create React App):
   ```yaml
   command: npm start  # Instead of npm run dev
   ```

4. **Output Directory** (if not using Vite):
   ```dockerfile
   # In Dockerfile, change if your build outputs to 'build' instead of 'dist'
   COPY --from=build /app/build /usr/share/nginx/html
   ```

### Framework-Specific Notes

#### ✅ Works With (Vite-based):
- React + Vite ✓
- Vue + Vite ✓
- Svelte + Vite ✓
- Preact + Vite ✓
- Lit + Vite ✓

#### ⚠️ Needs Minor Changes:
- **Create React App**: 
  - Change `npm run dev` → `npm start`
  - Change `npm run build` → `npm run build` (same)
  - Change `/app/dist` → `/app/build`
  - Update port from 5173 to 3000 in vite.config

#### ❌ Needs Different Setup:
- **Next.js**: Has its own server, doesn't use Nginx (use standalone mode)
- **Gatsby**: Static site generator, similar but different build process
- **Remix**: Needs Node.js runtime, can't use static Nginx approach

### Example: Adapting for a New Project

```bash
# 1. Copy files to your new project
cp Dockerfile docker-compose.yml docker-compose.prod.yml nginx.conf .dockerignore /path/to/new-project/

# 2. Create .env with your app's variables
cd /path/to/new-project
echo "VITE_API_URL=https://api.example.com" > .env

# 3. Update docker-compose.yml (just change the env var names)
# Edit environment section to match your .env variables

# 4. Add vite.config.ts server settings (if not present)
# See vite.config.ts section in this doc

# 5. Run
docker compose run --rm dev npm install
docker compose up
```

### Template Repository Suggestion

Consider creating a GitHub template repository with these Docker files for quick project setup:

```
docker-vite-template/
├── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
├── nginx.conf
├── .dockerignore
├── .env.example
└── README.md (with setup instructions)
```

Then use `npx degit your-username/docker-vite-template` to scaffold new projects!

For questions or issues, refer to the main [README.md](README.md) or Docker documentation.
