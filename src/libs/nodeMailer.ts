import nodemailer from "nodemailer";
import config from "../config";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.GMAIL_USERNAME,
    pass: config.GMAIL_PASSWORD,
  },
});

export const sendConfirmationEmail = async (
  username: string,
  email: string,
  confirmationCode: string
) => {
  try {
    await transport.sendMail({
      from: `"Auth Server"`,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${username}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href="${config.HOST_NAME}/api/confirm/${confirmationCode}" target="_blank">Click here</a>
          </div>`,
    });
  } catch (error) {
    console.error(error);
  }
};
