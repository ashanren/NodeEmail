import { Type, Static } from "@sinclair/typebox";
import { FormatRegistry } from "@sinclair/typebox";


FormatRegistry.Set('number_array', (value: string) => {
  console.log("number_array");
  const result = value.match(/^\d*(?:,\d*)*$/);
  if (result === null || result.length > 1 || result[0] !== value) return false;
  return true;
});

const idSchema = Type.Object({
  id: Type.Number(),
});
type Id = Static<typeof idSchema>;

const idsSchema = Type.Array(Type.Number());
type Ids = Static<typeof idsSchema>;

const idsQuerySchema = Type.Object({
  ids: Type.String({format: 'number_array'})
});
type IdsQuery = Static<typeof idsQuerySchema>;



export { idSchema, Id, idsQuerySchema, IdsQuery };