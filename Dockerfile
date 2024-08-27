FROM node:18-alpine AS builder

RUN apk add --no-cache gcompat

WORKDIR /app

COPY package*.json ./
COPY src ./src
COPY public ./public

RUN npm ci && npm run build

FROM nginx:alpine

LABEL maintainer="Davenchy <firon1222@gmail.com>"
LABEL description="TaskHive a projects management tool"

WORKDIR /app

COPY --from=builder /app/build .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
