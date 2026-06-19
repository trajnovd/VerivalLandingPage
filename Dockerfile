FROM node:22-alpine AS web-build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ARG VITE_RECAPTCHA_SITE_KEY
ENV VITE_RECAPTCHA_SITE_KEY=$VITE_RECAPTCHA_SITE_KEY
RUN npm run build

FROM node:22-alpine AS api-deps
WORKDIR /app/server

COPY server/package*.json ./
RUN npm ci --omit=dev

FROM node:22-alpine
WORKDIR /app

RUN apk add --no-cache nginx

COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY --from=web-build /app/dist /usr/share/nginx/html
COPY --from=api-deps /app/server/node_modules /app/server/node_modules
COPY server/index.js /app/server/index.js
COPY docker/start.sh /app/start.sh

RUN chmod +x /app/start.sh

EXPOSE 80
CMD ["/app/start.sh"]
