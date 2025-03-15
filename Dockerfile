FROM node:23.10.0-alpine3.21 AS builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY ./public/ public
COPY astro.config.mjs .
COPY tsconfig.json .
COPY ./src/ src
RUN npm run build

FROM nginx:1.27.4-alpine3.21
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html