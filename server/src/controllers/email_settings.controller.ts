import { FastifyInstance } from "fastify";
import * as EmailSettingsService from "./../services/email_settings.service";

export default async (app: FastifyInstance) => {

  app.get('/', (_req, _res) => {
    return EmailSettingsService.get();
  });

  app.post('/', (req, res) => {
    return {};
  });

  app.put('/', (req, res) => {
    return {};
  });

}
