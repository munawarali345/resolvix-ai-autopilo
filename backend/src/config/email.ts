// ================================================================
// Nodemailer Configuration
// ================================================================

import nodemailer from 'nodemailer';
import { env } from './validateEnv.js';
import logger from '../lib/logger.js';

export const transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
    user: env.EMAIL_USER,

    pass: env.EMAIL_PASS,
  },
});

// Jab server start hota hai to Nodemailer Gmail se connect hone ki koshish karta hai aur check karta hai ke credentials sahi hain ya nahi.

// Sirf connection check karta hai.

// Verify SMTP connection
//Nodemailer ko bol rahe ho: Email server se connection test karo
transporter.verify((error) => {
  // Agar connection fail hua to error me reason aayega.

  if (error) {
    logger.error('Email configuration failed', error);
  } else {
    logger.info('Email server ready');
  }
});
