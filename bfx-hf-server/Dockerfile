FROM node:8.12.0-slim AS base

FROM base AS dependencies
RUN apt-get update && apt-get install -y git
WORKDIR /srv
COPY package.json package-lock.json ./
RUN npm install

FROM base AS release
WORKDIR /srv
COPY --from=dependencies /srv/node_modules ./node_modules
COPY package.json package-lock.json index.js connect-db.js ./

ENV API_KEY=CHANGE-ME \
    API_SECRET=CHANGE-ME \
    WS_URL=wss://api.bitfinex.com/ws/2 \
    REST_URL=https://api.bitfinex.com \
    MONGODB_URL=mongodb://localhost/hf-as \
# unset SOCKS_PROXY_URL, means no socks proxy
#    SOCKS_PROXY_URL=CHANGE-ME \
# unset DEBUG, means no debug log by default
#    DEBUG=* \
    SERVER_PORT=8877

EXPOSE 8877

CMD node index.js
