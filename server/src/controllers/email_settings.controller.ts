import { FastifyInstance } from "fastify";
import * as EmailSettingsService from "./../services/email_settings.service";
import { settingsSchema, Settings, UpdateSettings, updateSettingsSchema, settingsFilterSchema } from "./../schemas/settings";
import { idSchema, Id, idsQuerySchema, IdsQuery } from "./../schemas/generic";

export default async (app: FastifyInstance) => {
  app.get('/', { schema: {
    querystring: settingsFilterSchema,
  }

  }, (req, _res) => {
    return EmailSettingsService.get(req.query);
  });

  app.post<{Body: Settings}>('/', { schema: {
    body: settingsSchema
  }}, async (req, _res) => {
    return EmailSettingsService.add(req.body);
  });

  app.put<{Params: Id, Body: UpdateSettings}>('/:id', { schema: {
    params: idSchema,
    body: updateSettingsSchema,
  }}, (req, _res) => {
    return EmailSettingsService.update(req.params.id, req.body);
  });

  app.delete<{Querystring: IdsQuery}>('/', { schema: {
    querystring: idsQuerySchema,
  }}, (req, _res) => {
    return EmailSettingsService.del(req.query.ids.split(',').map(i => Number(i)));
  })

}
