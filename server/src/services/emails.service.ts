import nodemailer from "nodemailer";
import * as EmailSettingsService from "./email_settings.service";
import { Email } from "./../schemas/emails";
import { transports } from "../utils/transports";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import logger from "../config/logger";

export const send = async (email: Email) => {
  const settings = await EmailSettingsService.get({id: email.email_settings_id});
  console.log(settings);
  if (!settings.length) {
    throw new Error("Invalid Email Settings");
  }
  if (!transports[email.email_settings_id]) {
    const {host, secure, port, tls, user, pass} = settings[0];
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
      tls: (tls && typeof tls === 'object' && !Array.isArray(tls) ? tls : undefined)
    };

    transports[email.email_settings_id] = nodemailer.createTransport(options);
  }
  
  let attachments = [];
  /*
  let addible = email;
  if (addible.attachments) {
    attachments = addible.attachments;
    delete addible.attachments;
  }
  const added_email = await add(addible);
  */
  const result = await transports[email.email_settings_id].sendMail({from: settings[0].user, to: email.to, subject: email.subject, text: email.text, html: email.html, attachments: email.attachments, bcc: email.bcc, cc: email.cc});
  if (result.rejected.length) {
    throw Error("Failed to Send Email");
    logger.error("Failed");
  } else {
    //await update(added_email[0].id, {success: 1});
  }
}
