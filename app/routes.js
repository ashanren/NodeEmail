
const LOG   = require('../config/logger');
const email = require('./controllers/email');

module.exports = (app) => {
  //map submit post request
  app.post('/send', email.sendMail);

  //forbid any other requests for any verb
  app.all('*', (req, res) => {
    res.status(402).send('Forbidden');
  });
}

