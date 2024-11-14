// server.mjs
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import SibApiV3Sdk from '@getbrevo/brevo';
import bodyParser from 'body-parser';

// __dirname replacement in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Brevo with the new syntax
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const app = express();
const PORT = process.env.PORT || 3000;
//const PORT = "shoprite-server.onrender.com";

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());

// Serve static files
app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')));

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Serve the main HTML file
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

app.get('/send-order', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'req.json'));
});
app.get('/send-rating', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'req2.json'));
});
app.get('/send-newsletter', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'req.json'));
});
// API endpoint to handle order emails
app.post('/send-order', async (req, res) => {
  const { formData, cart } = req.body;
  const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
  
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
        ${cart.map(item => `<li>${item.title} - R${item.price.toFixed(2)}</li>`).join('')}
      </ul>
      <p><strong>Total:</strong> R${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
    </div>
  `;

  try {
    // Business email
    const businessEmail = new SibApiV3Sdk.SendSmtpEmail();
    businessEmail.subject = `New Order Submission #${orderId}`;
    businessEmail.htmlContent = emailBody;
    businessEmail.sender = { name: 'Your Company Name', email: 'andisanimudau101@gmail.com' };
    businessEmail.to = [{ email: 'info@businessdev.co.za', name: 'Business' }];

    // Customer email
    const customerEmail = new SibApiV3Sdk.SendSmtpEmail();
    customerEmail.subject = `Order Confirmation #${orderId}`;
    customerEmail.htmlContent = customerEmailBody;
    customerEmail.sender = { name: 'Your Company Name', email: 'andisanimudau101@gmail.com' };
    customerEmail.to = [{ email: formData.email, name: `${formData.firstName} ${formData.lastName}` }];

    await Promise.all([
      apiInstance.sendTransacEmail(businessEmail),
      apiInstance.sendTransacEmail(customerEmail)
    ]);

    res.json({
      Sent: [{ Email: formData.email, MessageID: orderId }]
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// New endpoint to handle Contact Form submissions
app.post('/send-contact', async (req, res) => {
  const { email, message } = req.body;

  try {
    const sendEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendEmail.subject = `New Contact Message from ${email}`;
    sendEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Contact Message</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    `;
    sendEmail.sender = { name: 'Your Company Name', email: 'andisanimudau101@gmail.com' };
    sendEmail.to = [{ email: 'info@businessdev.co.za', name: 'Business' }];

    await apiInstance.sendTransacEmail(sendEmail);
    res.json({ message: 'Contact message sent successfully!' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ error: 'Failed to send contact message' });
  }
});

// New endpoint to handle Rating Form submissions
app.post('/send-rating', async (req, res) => {
  const { rating, email, comments } = req.body;

  try {
    const sendEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendEmail.subject = `New Customer Rating from ${email}`;
    sendEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Customer Rating</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Rating:</strong> ${rating} / 5</p>
        <p><strong>Comments:</strong></p>
        <p>${comments}</p>
      </div>
    `;
    sendEmail.sender = { name: 'Your Company Name', email: 'andisanimudau101@gmail.com' };
    sendEmail.to = [{ email: 'feedback@businessdev.co.za', name: 'Business Feedback' }];

    await apiInstance.sendTransacEmail(sendEmail);
    res.json({ message: 'Rating submitted successfully!' });
  } catch (error) {
    console.error('Error sending rating email:', error);
    res.status(500).json({ error: 'Failed to submit rating' });
  }
});

// New endpoint to handle Newsletter Subscriptions
app.post('/send-newsletter', async (req, res) => {
  const { email } = req.body;

  try {
    const sendEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendEmail.subject = 'Newsletter Subscription Confirmation';
    sendEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p>Thank you for subscribing to our newsletter!</p>
      </div>
    `;
    sendEmail.sender = { name: 'Your Company Name', email: 'andisanimudau101@gmail.com' };
    sendEmail.to = [{ email: email, name: 'Subscriber' }];

    await apiInstance.sendTransacEmail(sendEmail);
    res.json({ message: 'Newsletter subscription successful!' });
  } catch (error) {
    console.error('Error sending newsletter email:', error);
    res.status(500).json({ error: 'Failed to subscribe to newsletter' });
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