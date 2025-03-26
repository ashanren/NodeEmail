import { FastifyInstance } from "fastify";
import * as EmailsService from "./../services/emails.service";
import { Email, emailSchema } from "../schemas/emails";

export default async (app: FastifyInstance) => {
  app.post<{Body: Email}>('/send', { schema: {
    body: emailSchema
  }}, async (req, _res) => {
    return EmailsService.send(req.body);
  });
}
