import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (firstName, lastName, message, replyTo) => {
  message = message.replace(/\n/g, "<br>");
  console.log(message);
  console.log(process.env.SENDGRID_EMAIL_ADDRESS);
  const msg = {
    to: process.env.SENDGRID_EMAIL_ADDRESS,
    from: process.env.SENDGRID_EMAIL_ADDRESS,
    subject: "New message from easy-sim contact form.",
    html: `<div>New Message From ${firstName} ${lastName}: <br><div>${message}</div></div>`,
    replyTo: replyTo,
  };
  try {
    const res = await sgMail.send(msg);
    console.log(res);
  } catch (error) {
    throw error;
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail email address
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
});

export const sendContactMessage = async (
  firstName,
  lastName,
  message,
  replyTo
) => {
  // Replace newlines with <br> for HTML formatting
  message = message.replace(/\n/g, "<br>");

  // Email message details
  const mailOptions = {
    from: process.env.CONTACT_EMAIL_ADDRESS,
    to: process.env.CONTACT_EMAIL_ADDRESS,
    subject: "New message from easy-sim contact form.",
    html: `<div>New Message From ${firstName} ${lastName}: <br><div>${message}</div></div>`,
    replyTo: replyTo,
  };

  try {
    await sendEmailByNodeMailer(mailOptions);
  } catch (error) {
    throw error;
  }
};

export const sendRecoveryToken = async (email, url) => {
  // Email message details
  const mailOptions = {
    from: process.env.CONTACT_EMAIL_ADDRESS,
    to: email,
    subject: "Password Recovery",
    html: `<div>Click the link to recover your password: <a href=${url}>Recover Password</a></div>`,
  };

  try {
    await sendEmailByNodeMailer(mailOptions);
  } catch (error) {
    throw error;
  }
};

export const sendEmailByNodeMailer = async ({
  from,
  to,
  subject,
  html,
  replyTo,
}) => {
  // Configure the Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CONTACT_EMAIL_ADDRESS,
      pass: process.env.CONTACT_EMAIL_SECRET,
    },
  });

  // Email message details
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: html,
    replyTo: replyTo,
  };
  try {
    // Send the email
    const res = await transporter.sendMail(mailOptions);
    console.log(res);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
