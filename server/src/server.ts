
import crypto from "crypto";
import app from "./app";
import db from "./db/db";
import logger from "./config/logger";
import context from "./config/context";
import { sleep } from "./utils/helper";

const server = app({
  logger,
  disableRequestLogging: true,
  requestIdHeader: false,
  requestIdLogLabel: "requestId",
  genReqId: (_req) => {
    return crypto.randomUUID();
  } 
});

const host = "0.0.0.0";
const port: number = Number(process.env.PORT) || 3000;


(async () => {

  const sleep_count = 2;
  while (true) {
    try {
      await db.raw('SELECT 1');
      logger.info("DB connected.");
      break;
    } catch (err) {
      logger.error(err);
      logger.warn(`DB not connected yet. Trying again in ${sleep_count}`);
      await sleep(sleep_count);
    }

  }
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

  server.addHook("onResponse", (req, res, next) => {
    let timer = res.getResponseTime() + "ms";
    logger.info({url: req.raw.url, statusCode: res.raw.statusCode, timer}, "request completed");
  });

  await db.migrate.latest({directory: `${__dirname}/db/migrations`});
  await server.listen({host, port });

})();

