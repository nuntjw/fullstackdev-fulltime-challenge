FROM node:14.7-alpine

COPY . /usr/src/app/

ARG APP_ENV

EXPOSE 3000

WORKDIR /usr/src/app/

RUN yarn install --production=false -q && \
    yarn run build && \
    yarn install --production=true -q && \
    yarn cache clean
