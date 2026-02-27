# syntax=docker/dockerfile:1

# ============================================
# REUSABLE FOR ANY VITE + REACT PROJECT
# ============================================
# Customize: ARG/ENV variables for your project's build-time environment variables
# Works with: Vite, React, Vue, Svelte (any Vite-based project)
# ============================================

# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy source code
COPY . .

# ============================================
# CUSTOMIZE: Add your build-time environment variables here
# Example: ARG VITE_API_URL, ARG VITE_API_KEY, etc.
# Remove or modify these based on your app's needs
# ============================================
ARG VITE_RAWG_API_URL
ARG VITE_RAWG_API_KEY

ENV VITE_RAWG_API_URL=${VITE_RAWG_API_URL}
ENV VITE_RAWG_API_KEY=${VITE_RAWG_API_KEY}
# ============================================

# Build the app (outputs to /app/dist by default for Vite)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.27-alpine

# Copy nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
# CUSTOMIZE: If your bundler outputs to a different directory (e.g., 'build' instead of 'dist'),
# change /app/dist to match your output directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
