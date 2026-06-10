
// ================================================================
// Email Service - Send Emails (Verification / Future use)
// ================================================================

import { transporter } from "../config/email.js";
import { env } from "../config/validateEnv.js";

// ================================================================
// 1. Send Email Verification Link
// ================================================================

export const sendVerificationEmail = async (
  email: string,
  token: string
): Promise<void> => {

  // Frontend verification link : User ke liye link ban raha hai
  const verificationUrl = `${env.CLIENT_URL}/verify-email?token=${token}`;

  // Email content
  const mailOptions = {

    from: `"Resolvix AI" <${env.EMAIL_USER}>`, // Email kis naam se jayega

    to: email,                                // kis user ko email ja rahi hai

    subject: "Verify your email",            // email ka title

    html: `                                 
      <div style="font-family: Arial;">
        <h2>Email Verification</h2>
        <p>Click below to verify your email:</p>
        <a href="${verificationUrl}">
          Verify Email
        </a>
        <p>This link will expire in 1 hour.</p>
      </div>
    `,                                      // actual email design + button

  };

  await transporter.sendMail(mailOptions); // email send ho rahi hai Gmail se
};


// ================================================================
// 1. RESET PASSWORD EMAIL SERVICE 
// ================================================================
export const sendResetPasswordEmail = async (
  email: string,
  token: string
): Promise<void> => {

  // frontend reset link
  const resetUrl = `${env.CLIENT_URL}/reset-password?token=${token}`;

  // email content
  const mailOptions = {

    from: `"Resolvix AI" <${env.EMAIL_USER}>`,

    to: email,

    subject: "Reset Your Password",
    
    html: `
      <div style="font-family: Arial;">
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password.</p>

        <a href="${resetUrl}" style="
          display:inline-block;
          padding:10px 20px;
          background:#4f46e5;
          color:white;
          text-decoration:none;
          border-radius:5px;
        ">
          Reset Password
        </a>

        <p>This link will expire in 15 minutes.</p>
        <p>If you did not request this, ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};