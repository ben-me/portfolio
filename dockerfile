FROM node:24-alpine AS base

WORKDIR /src

RUN corepack enable 

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm nuxt build --prerender

FROM nginx:alpine AS prod

COPY --from=base /src/.output/public/ /usr/share/nginx/html

EXPOSE 80
