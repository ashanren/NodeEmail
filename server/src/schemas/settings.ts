import { Type, Static } from "@sinclair/typebox";

const settingsSchema = Type.Object({
  host: Type.String(),
  port: Type.Number(),
  user: Type.String(),
  pass: Type.String(),
  secure: Type.Optional(Type.Union([Type.Literal(1), Type.Literal(0)])),
  //secure: Type.Optional(Type.Enum({1, 2}))
});

type Settings = Static<typeof settingsSchema>;

export { settingsSchema, Settings };