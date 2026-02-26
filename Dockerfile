# syntax=docker/dockerfile:1

FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .

ARG VITE_RAWG_API_URL
ARG VITE_RAWG_API_KEY

ENV VITE_RAWG_API_URL=${VITE_RAWG_API_URL}
ENV VITE_RAWG_API_KEY=${VITE_RAWG_API_KEY}

RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
