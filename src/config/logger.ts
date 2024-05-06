import fastify from "fastify";
import context from "./context";

const logger = fastify({
  logger: {
    base: {},
    level: 'trace',
    mixin() {
      const store: any = context.getStore();
      if (store) {
        return {
          requestId: store?.id || null,
        }
      }
      return {};
    }
  }
});


export default logger.log;