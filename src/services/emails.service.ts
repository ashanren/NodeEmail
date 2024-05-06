import { promises as fs } from 'fs';
import nodemailer from "nodemailer";
import { Email } from "./../schemas/emails";
import { transports } from "../utils/transports";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import logger from "../config/logger";
import { Settings, settingsSchema } from '../schemas/settings';
import { validatorFactory } from '../schemas/validator';

const settingsValidation = validatorFactory<Settings>(settingsSchema);

export const send = async (email: Email) => {
  const settings = settingsValidation.verify(JSON.parse(await fs.readFile("./email.json", "utf8")));

  if (!transports[1]) {
    console.log(settings);
    const {host, secure, port, tls, user, pass} = settings;
    const pool = {
      pool: true,
      maxConnections: 3,
    }
    const options: SMTPTransport.Options = {
      host,
      port,
      auth: {
        user,
        pass
      },
      secure: !!secure,
      ...pool,
      tls: tls? tls : undefined
    };

    transports[1] = nodemailer.createTransport(options);
  }
  
  const result = await transports[1].sendMail({from: settings.user, to: email.to, subject: email.subject, text: email.text, html: email.html, attachments: email.attachments, bcc: email.bcc, cc: email.cc});
  if (result.rejected.length) {
    logger.error("Failed");
    throw Error("Failed to Send Email");
  }
 return result;
}
