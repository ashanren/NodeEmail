
import { reset_migrations } from "./db";

(async () => {
  await reset_migrations();
  process.exit();
})();