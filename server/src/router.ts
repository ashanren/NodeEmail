import { FastifyInstance } from "fastify";
import EmailSettingsController from "./controllers/email_settings.controller";
import EmailsController from "./controllers/emails.controller";

export default async (app: FastifyInstance) => {
  app.register(EmailSettingsController, {prefix: "/email_settings"});
  app.register(EmailsController, {prefix: "/emails"});
}