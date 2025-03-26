import { Type, Static } from "@sinclair/typebox";

const emailSchema = Type.Object({
  to: Type.Union([Type.String(), Type.Array(Type.String())]),
  subject: Type.String(),
  cc: Type.Optional(Type.String()),
  bcc: Type.Optional(Type.String()),
  text: Type.Optional(Type.String()),
  html: Type.Optional(Type.String()),
  attachments: Type.Optional(Type.Array(Type.Union([
    Type.Object({
      filename: Type.String(),
      content: Type.Any(),
      encoding: Type.Optional(Type.String()),
      contentType: Type.Optional(Type.String()),
    }),
    Type.Object({
      filename: Type.String(),
      path: Type.String(),
    }),
    Type.Object({
      path: Type.String(),
    }),
    Type.Object({
      raw: Type.String(),
    }),
    Type.Object({
      filename: Type.Optional(Type.String()),
      content: Type.Optional(Type.Any()),
      path: Type.Optional(Type.String()),
      
      raw: Type.Optional(Type.Any())
    }),
  ]))),
});

type Email = Static<typeof emailSchema>;

export { emailSchema, Email };