
const LOG         = require('./../../config/logger');
const transport   = require('./../../config/mailer');
const mailConfig  = require('./../../config/config').EMAIL_SETTINGS;

exports.sendMail = async (req, res) => {
  try {
    LOG.info();
    const body = typeof(req.body) === "string" ? JSON.parse(req.body):  req.body;
    const mail = {
      from: mailConfig.auth.user,
      to: body.to,
      subject: body.subject,
      text: body.text,
    };
    LOG.info("%o", mail);
    const result   = await transport.sendMail(mail);
    if (result.rejected.length > 0) {
      LOG.error(`Unable to send email to ${result.rejected.join()}`);
    }
    LOG.info(result);
    return res.send();
  } catch(err) {
    LOG.error(err);
    return res.status(400).send();
  }
}
