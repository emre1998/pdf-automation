const nodemailer = require('nodemailer');

async function sendEmail(receiverEmail, senderEmail, password, subject, message, attachmentPath, recipientName) {
  const transporter = nodemailer.createTransport({
    service: 'domain',
    auth: {
      user: senderEmail,
      pass: password
    }
  });

  const mailOptions = {
    from: senderEmail,
    to: receiverEmail,
    subject: subject,
    text: message,
    attachments: [
      {
        filename: 'editted.pdf',
        path: attachmentPath
      }
    ]
  };

  const info = await transporter.sendMail(mailOptions);

  console.log(`E-posta ${info.messageId} kimliğiyle gönderildi`);
}

const receiverEmail = " receiver@domain.com";
const senderEmail = "sender@domain.com";
const password = "password";
const subject = "Subject";
const recipientName = "Who";
const message = `Sayın ${recipientName},\n\content \n what you write.`;
const attachmentPath = "editted.pdf";

sendEmail(receiverEmail, senderEmail, password, subject, message, attachmentPath, recipientName);
