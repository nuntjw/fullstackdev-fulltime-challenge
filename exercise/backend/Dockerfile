FROM node:14.7-alpine AS builder

COPY . /usr/src/app/

WORKDIR /usr/src/app/

RUN yarn -q install --production=false --no-lockfile --silent && \
    yarn run build && \
    yarn -q install --production=true --no-lockfile --silent && \
    yarn cache clean
    
FROM node:14.7-alpine

COPY --from=builder /usr/src/app/ /usr/src/app/
WORKDIR /usr/src/app/
CMD ["yarn", "run", "start"]