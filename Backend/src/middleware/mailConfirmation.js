import nodemailer from "nodemailer"
import { emailTemplate } from "../utilities/emailTemplate.js";
// Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
  
  service: "gmail",
  auth: {
    user: "momoooooo10001@gmail.com",
    pass: "whoa ltmy texs keya",
  },
  tls:{
    rejectUnauthorized:false
  }
});

export async function mailConfirmation(mail){
  
  
  const info = await transporter.sendMail({
    from: '"NTI" <momoooooo10001@gmail.com>', // sender address
    to: mail, // list of recipients
    subject: "Verify Your Account", // subject line
    text: "Please verify your account", // plain text body
    html: emailTemplate(mail), // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account



}
