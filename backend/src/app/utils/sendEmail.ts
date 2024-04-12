import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'mostakememon123@gmail.com',
      pass: 'sakf jxcw ftyd qiuo',
    },
  });

  await transporter.sendMail({
    from: '"mostakememon123@gmail.com', // sender address
    to, // list of receivers
    subject: 'Password reset link', // Subject line
    text: 'reset link', // plain text body
    html:`password reset-link : ${html}`
  });
};
