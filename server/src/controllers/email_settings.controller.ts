import { FastifyInstance } from "fastify";
import * as EmailSettingsService from "./../services/email_settings.service";
import { settingsSchema, Settings } from "./../schemas/settings";
import { idSchema, Id, idsQuerySchema, IdsQuery } from "./../schemas/generic";

export default async (app: FastifyInstance) => {
  app.get('/', (_req, _res) => {
    return EmailSettingsService.get();
  });

  app.post<{Body: Settings}>('/', { schema: {
    body: settingsSchema
  }}, async (req, _res) => {
    return EmailSettingsService.add(req.body);
  });

  app.put<{Params: Id, Body: Settings}>('/:id', { schema: {
    params: idSchema,
    body: settingsSchema,
  }}, (req, _res) => {
    return EmailSettingsService.update(req.params.id, req.body);
  });

  app.delete<{Querystring: IdsQuery}>('/', { schema: {
    querystring: idsQuerySchema,
  }}, (req, _res) => {
    return EmailSettingsService.del(req.query.ids.split(',').map(i => Number(i)));
  })

}
