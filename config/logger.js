
const app = require('fastify')({
  logger: {
    level: 'trace',
    prettyPrint: true,
    colorize: true,
    translateTime: 'SYS: ddd mmm dd yyyy HH:MM:ss Z'
  },
});


module.exports = app.log;
