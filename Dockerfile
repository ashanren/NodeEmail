FROM node:lts-alpine
WORKDIR /home/email

RUN apk --no-cache update && apk --no-cache upgrade
COPY package.json yarn.lock ./
RUN yarn
COPY . .
ENTRYPOINT [ "yarn", "start" ]
