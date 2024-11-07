// server.mjs
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Mailjet from 'node-mailjet';

// __dirname replacement in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Mailjet with the new syntax
const mailjetClient = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files
app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')));

// Serve the main HTML file
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

// API endpoint to handle order emails
app.post('/send-order', async (req, res) => {
  const { formData, cart } = req.body;

  // Generate a unique order ID
  const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();

  // Construct the email body using form data and cart items
  const emailBody = `
    <div style="font-family: Arial, sans-serif;">
      <h2>New Order Submission #${orderId}</h2>
      <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Address 1:</strong> ${formData.address1}</p>
      <p><strong>Address 2:</strong> ${formData.address2}</p>
      <p><strong>City:</strong> ${formData.city}</p>
      <p><strong>State:</strong> ${formData.state}</p>
      <p><strong>ZIP:</strong> ${formData.zip}</p>
      <p><strong>Payment Method:</strong> ${formData.paymentMethod}</p>
      <h3>Order Details:</h3>
      <ul>
        ${cart.map(item => `<li>${item.title} - $${item.price.toFixed(2)}</li>`).join('')}
      </ul>
      <p><strong>Total:</strong> $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
    </div>
  `;

  // Construct the customer confirmation email
  const customerEmailBody = `
    <div style="font-family: Arial, sans-serif;">
      <h2>Order Confirmation #${orderId}</h2>
      <p>Thank you for your order! Here are your order details:</p>
      ${emailBody}
      <p>We will contact you shortly with further information.</p>
    </div>
  `;

  try {
    // Send email to the business
    await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'andisanimudau101@gmail.com',
            Name: 'Your Company Name'
          },
          To: [
            {
              Email: 'info@businessdev.co.za',
              Name: 'Business'
            }
          ],
          Subject: `New Order Submission #${orderId}`,
          TextPart: 'New order received.',
          HTMLPart: emailBody
        }
      ]
    });

    // Send confirmation email to the customer
    await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'andisanimudau101@gmail.com',
            Name: 'Your Company Name'
          },
          To: [
            {
              Email: formData.email,
              Name: `${formData.firstName} ${formData.lastName}`
            }
          ],
          Subject: `Order Confirmation #${orderId}`,
          TextPart: 'Thank you for your order.',
          HTMLPart: customerEmailBody
        }
      ]
    });

    // Respond with success and order ID
    res.json({
      Sent: [
        {
          Email: formData.email,
          MessageID: orderId
        }
      ]
    });
  } catch (error) {
    console.error('Error sending email:', error.statusCode ? error.response.body : error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// New API endpoint to handle contact form submissions
app.post('/send-contact', async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required.' });
  }

  // Generate a unique contact ID
  const contactId = Math.random().toString(36).substr(2, 9).toUpperCase();

  // Construct the email body using form data
  const emailBody = `
    <div style="font-family: Arial, sans-serif;">
      <h2>New Contact Message #${contactId}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    </div>
  `;

  try {
    // Send email to the business
    await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'andisanimudau101@gmail.com',
            Name: 'Your Company Name'
          },
          To: [
            {
              Email: 'info@businessdev.co.za',
              Name: 'Business'
            }
          ],
          Subject: `New Contact Message #${contactId}`,
          TextPart: 'New contact message received.',
          HTMLPart: emailBody
        }
      ]
    });

    // Optionally, send a confirmation email to the user
    const customerEmailBody = `
      <div style="font-family: Arial, sans-serif;">
        <h2>Message Received #${contactId}</h2>
        <p>Thank you for reaching out to us! We have received your message and will get back to you shortly.</p>
        <p><strong>Your Message:</strong></p>
        <p>${message}</p>
      </div>
    `;

    await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'andisanimudau101@gmail.com',
            Name: 'Your Company Name'
          },
          To: [
            {
              Email: email,
              Name: 'Valued Customer'
            }
          ],
          Subject: `We Received Your Message #${contactId}`,
          TextPart: 'Thank you for contacting us.',
          HTMLPart: customerEmailBody
        }
      ]
    });

    // Respond with success and contact ID
    res.json({
      Sent: [
        {
          Email: email,
          MessageID: contactId
        }
      ]
    });
  } catch (error) {
    console.error('Error sending contact email:', error.statusCode ? error.response.body : error);
    res.status(500).json({ error: 'Failed to send contact email' });
  }
});

// Server listening code
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy. Trying port ${PORT + 1}`);
    server.listen(PORT + 1);
  } else {
    console.error('Server error:', err);
  }
});