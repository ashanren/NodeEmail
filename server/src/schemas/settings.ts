import { Type, Static } from "@sinclair/typebox";

const settingsSchema = Type.Object({
  host: Type.String(),
  port: Type.Number(),
  user: Type.String(),
  pass: Type.String(),
  secure: Type.Optional(Type.Union([Type.Literal(1), Type.Literal(0)])),
  tls: Type.Optional(Type.Any()),
});

const updateSettingsSchema = Type.Partial(settingsSchema);

type Settings = Static<typeof settingsSchema>;
type UpdateSettings = Static<typeof updateSettingsSchema>;

export { settingsSchema, updateSettingsSchema, Settings, UpdateSettings };