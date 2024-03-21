const nodemailer = require('nodemailer');

async function sendEmail(receiverEmail, senderEmail, password, subject, message, attachmentPath, recipientName) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
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
        filename: 'teklif.pdf',
        path: attachmentPath
      }
    ]
  };

  const info = await transporter.sendMail(mailOptions);

  console.log(`E-posta ${info.messageId} kimliğiyle gönderildi`);
}

const receiverEmail = " arya@arya-ai.com";
const senderEmail = "kizilatesemrecan@gmail.com";
const password = "qgow kafd rudf fgop";
const subject = "Teklif Talebiniz";
const recipientName = "UYY";
const message = `Sayın ${recipientName},\n\nÖncelikle Arya-AI göstermiş olduğunuz ilgi için teşekkür ederiz.\n\nEkte görüştüğümüz kapsamda oluşturduğumuz teklifi bulabilirsiniz.\n\nTeklif olurunuz geldiği gün iş planına süreçleriniz dahil edilecektir\n\nSaygılarımızla`;
const attachmentPath = "TEKLIF.pdf";

sendEmail(receiverEmail, senderEmail, password, subject, message, attachmentPath, recipientName);
