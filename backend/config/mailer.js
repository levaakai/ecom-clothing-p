import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "distrodistro287@gmail.com",
    pass: "hdoy ttnj thjw uhsh ",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export const mail = async (link) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"ECOM CLOTHING" <no-reply@ecom.com>`, // sender address
    to: "levaakai@gmail.com", // list of receivers
    subject: "Reset Password ", // Subject line
    text: "Reset Password?", // plain text body
    replyTo: "no-reply@ecom.com",
    html: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Password Reset</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f2f2f2;
                                padding: 20px;
                            }
                            .container {
                                background-color: #ffffff;
                                padding: 30px;
                                border-radius: 8px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                                max-width: 600px;
                                margin: 0 auto;
                            }
                            h2 {
                                color: #333333;
                                font-size: 24px;
                            }
                            p {
                                font-size: 16px;
                                color: #555555;
                            }
                            .reset-link-button {
                                display: inline-block;
                                padding: 12px 20px;
                                background-color: #007bff;
                                color: #ffffff;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 16px;
                                font-weight: bold;
                                margin-top: 20px;
                            }
                            .reset-link-button:hover {
                                background-color: #0056b3;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h2>Password Reset Request</h2>
                            <p>Hello,</p>
                            <p>We received a request to reset your password. Click the link below to reset your password:</p>
                            <form method="POST">
                                <a href=${link} class="reset-link-button">Reset Password</a>
                            </form>
                            <p>If you did not request this, please ignore this email.</p>
                            <p>Thanks,</p>
                            <p>Ecom Clothing Team</p>
                        </div>
                    </body>
                    </html>

          
          `,
  });

  console.log("Message sent: %s", info.messageId);
};


export const checkoutConfirmationMail = async (userEmail, orderId, totalAmount) => {
    const info = await transporter.sendMail({
        from: `"ECOM CLOTHING" <no-reply@ecom.com>`,
        to: `${userEmail}`,
        subject: `🧾 Order Confirmation - Order #${orderId}`,
        replyTo: "no-reply@ecom.com",
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Order Confirmation</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f8f9fa;
                        padding: 20px;
                        color: #333;
                    }
                    .container {
                        background-color: #fff;
                        padding: 30px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        max-width: 600px;
                        margin: auto;
                    }
                    h2 {
                        color: #2c3e50;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.5;
                    }
                    .highlight {
                        font-weight: bold;
                        color: #007bff;
                    }
                    .footer {
                        margin-top: 30px;
                        font-size: 14px;
                        color: #999;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Thank you for your purchase!</h2>
                    <p>Hi there,</p>
                    <p>We're excited to let you know that we've received your order <span class="highlight">#${orderId}</span>.</p>
                    <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
                    <p>Your items are being prepared and we'll notify you when they're on the way.</p>
                    <p>If you have any questions, feel free to reply to this email.</p>
                    <p>Thanks for shopping with us!</p>
                    <p>- The Ecom Clothing Team</p>

                    <div class="footer">
                        <p>This is an automated email. Please do not reply directly.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    });

    return info;
}


/**
 *
 * Run:
 *
 */
import Mailjet from 'node-mailjet';

const mailjetClient = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC || '2a66766bd3c178c98220f9b286f13864',
    apiSecret: process.env.MJ_APIKEY_PRIVATE || '4912325ab2ec7858487ca65758cf211b'
  });

export const sendMailjetEmail = async (recipientEmail, subject, textBody, htmlBody) => {
  try {
    const result = await mailjetClient
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: 'distrodistro287@gmail.com',   // Replace with a verified sender email
              Name: 'Ecom Clothing',
            },
            To: [
              {
                Email: recipientEmail,
                Name: 'Customer',
              },
            ],
            Subject: subject,
            TextPart: textBody,
            HTMLPart: htmlBody,
          },
        ],
      });

    console.log("✅ Mail sent:", result.body);
  } catch (err) {
    console.error("❌ Mail error:", err.statusCode, err.response?.data);
  }
};
