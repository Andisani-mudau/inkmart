// server.mjs
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Mailjet from 'node-mailjet';
import bodyParser from 'body-parser';

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

// New endpoint to handle Contact Form submissions
app.post('/send-contact', async (req, res) => {
    const { email, message } = req.body;

    const emailBody = `
        <div style="font-family: Arial, sans-serif;">
            <h2>New Contact Message</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        </div>
    `;

    try {
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
                    Subject: `New Contact Message from ${email}`,
                    TextPart: 'You have received a new contact message.',
                    HTMLPart: emailBody
                }
            ]
        });

        res.json({ message: 'Contact message sent successfully!' });
    } catch (error) {
        console.error('Error sending contact email:', error.statusCode ? error.response.body : error);
        res.status(500).json({ error: 'Failed to send contact message' });
    }
});

// New endpoint to handle Rating Form submissions
app.post('/send-rating', async (req, res) => {
    const { rating, email, comments } = req.body;

    const emailBody = `
        <div style="font-family: Arial, sans-serif;">
            <h2>New Customer Rating</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Rating:</strong> ${rating} / 5</p>
            <p><strong>Comments:</strong></p>
            <p>${comments}</p>
        </div>
    `;

    try {
        await mailjetClient.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: 'andisanimudau101@gmail.com',
                        Name: 'Your Company Name'
                    },
                    To: [
                        {
                            Email: 'feedback@businessdev.co.za',
                            Name: 'Business Feedback'
                        }
                    ],
                    Subject: `New Customer Rating from ${email}`,
                    TextPart: 'You have received a new customer rating.',
                    HTMLPart: emailBody
                }
            ]
        });

        res.json({ message: 'Rating submitted successfully!' });
    } catch (error) {
        console.error('Error sending rating email:', error.statusCode ? error.response.body : error);
        res.status(500).json({ error: 'Failed to submit rating' });
    }
});

// New endpoint to handle Newsletter Subscriptions
app.post('/send-newsletter', async (req, res) => {
    const { email } = req.body;
    const emailBody = `
        <div style="font-family: Arial, sans-serif;">
            <h2>New Newsletter Subscription</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p>Thank you for subscribing to our newsletter!</p>
        </div>
    `;

    try {
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
                            Name: 'Subscriber'
                        }
                    ],
                    Subject: 'Subscription Confirmation',
                    TextPart: 'Thank you for subscribing to our newsletter.',
                    HTMLPart: emailBody
                }
            ]
        });

        res.json({ message: 'Newsletter subscription successful!' });
    } catch (error) {
        console.error('Error sending newsletter email:', error.statusCode ? error.response.body : error);
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