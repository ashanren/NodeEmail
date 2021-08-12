
const app = require('fastify')();
const helmet  = require('fastify-helmet');
const LOG = require('./config/logger');

const start = async () => {
  try {
    app.register(helmet);
    //routes
    require('./app/routes')(app);
    await app.listen((process.env.PORT || 3000), '0.0.0.0');
    LOG.info(`Server listening on ${app.server.address().port}`);
  } catch (err) {
    LOG.error(err);
    process.exit(1);
  }
}

start();
