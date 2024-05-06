
FROM alpine:latest AS builder
WORKDIR /opt/tmp
RUN apk --no-cache update && apk --no-cache upgrade && apk --no-cache --update add nodejs yarn
COPY . .
RUN yarn && yarn build 

FROM alpine:latest AS production
ENV NODE_ENV=production
RUN apk --no-cache --update add nodejs yarn
WORKDIR /opt/app
COPY --from=builder /opt/tmp/dist .
COPY package.json yarn.lock .
RUN yarn --prod
CMD ["yarn", "start"]


FROM alpine AS print
RUN apk --no-cache --update add nodejs yarn
RUN yarn global add pino-pretty
ENTRYPOINT ["pino-pretty"]
