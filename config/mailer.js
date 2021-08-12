
const nodemailer  = require("nodemailer");
const mailConfig  = require('./config').EMAIL_SETTINGS;
const transporter = nodemailer.createTransport(mailConfig);

module.exports  = transporter;

