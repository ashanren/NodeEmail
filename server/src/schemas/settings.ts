import { Type, Static } from "@sinclair/typebox";

const settingsFilterSchema = Type.Partial(Type.Object({
  id: Type.Number(),
  host: Type.String(),
  user: Type.String(),
}));
const settingsSchema = Type.Object({
  host: Type.String(),
  port: Type.Number(),
  user: Type.String(),
  pass: Type.String(),
  secure: Type.Optional(Type.Union([Type.Literal(1), Type.Literal(0)])),
  //secure: Type.Optional(Type.Enum({1, 2}))
});

const updateSettingsSchema = Type.Partial(settingsSchema);

type Settings = Static<typeof settingsSchema>;
type UpdateSettings = Static<typeof updateSettingsSchema>;
type SettingsFilter = Static<typeof settingsFilterSchema>;

export { settingsSchema, updateSettingsSchema, Settings, UpdateSettings, settingsFilterSchema, SettingsFilter };