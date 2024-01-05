import crypto from "crypto";
import fastify, { FastifyServerOptions } from "fastify";
import helmet from "@fastify/helmet";
import router from "./router";

const build_app = (opt: FastifyServerOptions = {}) => {
  const app = fastify(opt);
  //
  app.register(helmet);
  //Set router
  app.register(router);

  return app;
}


export default build_app;