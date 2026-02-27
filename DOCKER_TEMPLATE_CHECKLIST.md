# Docker Template - Copy Checklist

Use this checklist when copying these Docker files to a new React/Vite project.

## Files to Copy

- [ ] `Dockerfile`
- [ ] `docker-compose.yml`
- [ ] `docker-compose.prod.yml`
- [ ] `nginx.conf`
- [ ] `.dockerignore`
- [ ] `.env.example` → rename to `.env` and fill in values

## Customization Steps

### 1. Environment Variables

- [ ] Edit `.env` with your project's API keys and URLs
- [ ] Update `docker-compose.yml` environment section (lines with `VITE_*`)
- [ ] Update `docker-compose.prod.yml` build args (lines with `VITE_*`)
- [ ] Update `Dockerfile` ARG and ENV lines (lines with `VITE_*`)

**Quick find & replace:**
- Replace `VITE_RAWG_API_URL` with your variable name
- Replace `VITE_RAWG_API_KEY` with your variable name

### 2. Ports (Optional)

- [ ] Change port `5173` to your preferred port in:
  - `docker-compose.yml` (ports section)
  - `docker-compose.prod.yml` (ports section)
  - `vite.config.ts` (server.port)

### 3. Vite Config

- [ ] Add server configuration to `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
})
```

### 4. Build Output (If Not Using Vite)

If your bundler outputs to `build` instead of `dist`:

- [ ] In `Dockerfile`, change `/app/dist` to `/app/build`

### 5. Dev Command (If Using Create React App)

- [ ] In `docker-compose.yml`, change `npm run dev` to `npm start`

## Testing

- [ ] Run `docker compose run --rm dev npm install`
- [ ] Run `docker compose up`
- [ ] Verify app works at http://localhost:5173
- [ ] Test hot reload by editing a file
- [ ] Run `docker compose -f docker-compose.prod.yml up --build`
- [ ] Verify production build works

## Done! 🎉

Your new project is now Dockerized and portable!

## Common Issues

**"vite: not found"**
- Run `docker compose run --rm dev npm install` first

**Port already in use**
- Change the port in docker-compose files

**Hot reload not working**
- Make sure vite.config.ts has `usePolling: true`

**Environment variables not working**
- Check that `.env` file exists
- Verify variable names match in all files
- Restart containers after changing .env
