FROM node:20-alpine as base

WORKDIR /home

RUN npm i -g npm pnpm

COPY package.json .

RUN pnpm install

COPY . .

EXPOSE 8000

FROM base as development

CMD ["pnpm", "start:dev"]

FROM base as production

RUN pnpm build

CMD ["pnpm", "start:prod"]
