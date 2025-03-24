
import crypto from "crypto";
import app from "./app";
import logger from "./config/logger";
import context from "./config/context";

const server = app({
  logger,
  bodyLimit: 1048576 * (Number(process.env.REQUEST_SIZE) || 1),
  disableRequestLogging: true,
  requestIdHeader: false,
  requestIdLogLabel: "requestId",
  genReqId: (_req) => {
    return crypto.randomUUID();
  } 
});

const host = "0.0.0.0";
const port: number = Number(process.env.PORT) || 5000;


(async () => {

  server.addHook("onRoute", (routeOptions) => {
    logger.trace(`METHOD: ${routeOptions.method}, PATH: ${routeOptions.path}`);
  });

  server.addHook("onRequest", (req, _res, next) => {
    const store = {id: req.id};
    context.run(store, next);
  });

  server.addHook("onRequest", (req, _res, next) => {
    logger.info({method: req.method, url: req.raw.url}, "received request");
    next();
  });

  server.addHook("onResponse", (req, res, _next) => {
    let timer = res.getResponseTime() + "ms";
    logger.info({url: req.raw.url, statusCode: res.raw.statusCode, timer}, "request completed");
  });

  await server.listen({host, port });
})();

