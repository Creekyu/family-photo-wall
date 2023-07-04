const nodemailer = require('nodemailer');
const Email = require('../models/emailModel');

const sendEmail = async (options) => {
  const smtp = Email.getInstance();
  // 1) Create a transporter
  // 使用邮件发送代理
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    auth: {
      user: smtp.email,
      pass: smtp.password,
    },
  });

  // 2) Define the email options
  // 邮件信息
  const mailOptions = {
    from: 'Criik-Blog <sklin552@sina.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
