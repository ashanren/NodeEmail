import { TypeBoxTypeProvider, TypeBoxValidatorCompiler } from "@fastify/type-provider-typebox";
import fastify, { FastifyServerOptions } from "fastify";
import helmet from "@fastify/helmet";
import router from "./router";
import { DatabaseError } from "pg";

const build_app = (opt: FastifyServerOptions = {}) => {
  const app = fastify(opt).withTypeProvider<TypeBoxTypeProvider>();

  app.setValidatorCompiler(TypeBoxValidatorCompiler);
  app.register(helmet);
  //Set router
  app.register(router);

  app.setErrorHandler((error, _req, res) => {
    if (error instanceof DatabaseError) {
      let message = '';
      switch (error.code) {
        case "23505":
          message = "Attempting to add Duplicate";
          break;
        default:
          message = "Unknown Database Error";
      }
      return res.status(400).send({message, code: error.code});
    }

    return res.status(500).send(error);
  });

  return app;
}


export default build_app;