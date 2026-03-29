const nodemailer = require('nodemailer');

// For development, we'll use a test account (Ethereal)
// In production, user would provide SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
const sendOrderConfirmation = async (userEmail, orderDetails) => {
  try {
    // Generate test SMTP service account from ethereal.email
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, 
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"Flipkart Clone" <noreply@flipkartclone.com>',
      to: userEmail,
      subject: `Order Confirmed! Your Order ID is #${orderDetails.id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px;">
          <h2 style="color: #2874f0;">Thank you for your order!</h2>
          <p>Hi,</p>
          <p>Your order <strong>#${orderDetails.id}</strong> has been successfully placed and is being processed.</p>
          <hr />
          <h3>Order Summary:</h3>
          <p><strong>Total Amount:</strong> ₹${orderDetails.total_amount}</p>
          <p><strong>Shipping to:</strong> ${orderDetails.shipping_address}, ${orderDetails.shipping_city}</p>
          <hr />
          <p>You can track your order in the "My Orders" section of our app.</p>
          <p>Regards,<br />Flipkart Clone Team</p>
        </div>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = { sendOrderConfirmation };
