import { FastifyInstance } from "fastify";
import EmailSettingsController from "./controllers/email_settings.controller";

export default async (app: FastifyInstance) => {
  app.register(EmailSettingsController, {prefix: "/email_settings"});

}