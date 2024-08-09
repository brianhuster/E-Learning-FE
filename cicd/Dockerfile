FROM node:20.11.1-alpine3.19 as builder
WORKDIR /app
COPY  .yarn .yarn
COPY yarn.lock package.json ./
RUN yarn install
COPY . .
RUN yarn build-sw

FROM node:20.11.1-alpine3.19
WORKDIR /app
COPY --from=builder /app .
CMD ["node", ".output/server/index.mjs"]