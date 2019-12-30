import nodemailer from 'nodemailer';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  CONTACT_EMAIL
} = require('../../config');

export default async (req, res) => {
  const {method, body} = req;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // True for 465, false for other ports
    auth: {
      user: SMTP_USER, // Generated ethereal user
      pass: SMTP_PASSWORD // Generated ethereal password
    }
  });

  if (method === 'POST') {
    const email = await transporter.sendMail({
      from: `"Contact Form" <${SMTP_USER}>`, // Sender address
      replyTo: `"${body.fromName}" <${body.fromEmail}>`,
      to: CONTACT_EMAIL, // List of receivers
      subject: `[Contact Form] ${body.subjectCategory}: ${body.subjectName}`, // Subject line
      text: body.message // Plain text body
    });

    return res.json(email);
  }
};
