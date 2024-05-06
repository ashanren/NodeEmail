import { FastifyInstance } from "fastify";
import EmailsController from "./controllers/emails.controller";

export default async (app: FastifyInstance) => {
  app.register(EmailsController, {prefix: "/emails"});
}