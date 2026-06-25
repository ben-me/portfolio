FROM node:24-alpine AS base

WORKDIR /src

RUN corepack enable 

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

FROM nginx:alpine AS prod

RUN pnpm nuxt build --prerender

COPY --from=build /src/dist/client/ /usr/share/nginx/html

EXPOSE 80
