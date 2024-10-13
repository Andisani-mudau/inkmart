const express = require("express");
const path = require("path");
// Include the Brevo (Sendinblue) library
const SibApiV3Sdk = require('sib-api-v3-sdk');
const app = express();

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

//...
// START OF FILE: email.js



// Instantiate the client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Function to send the order confirmation email to the user
function sendOrderConfirmation(userEmail, userName, orderDetails) {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
        to: [{ email: userEmail, name: userName }],
        sender: { name: 'Businessdev', email: 'info@businessdev.co.za' },
        subject: 'Order Confirmation',
        htmlContent: `<h1>Order Confirmation</h1><p>Dear ${userName},</p><p>Thank you for your order. Here are your order details:</p><ul>${orderDetails}</ul><p>We will process your order soon.</p>`
    });

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
        function (data) {
            console.log('Order confirmation sent successfully to user. Returned data: ' + data);
        },
        function (error) {
            console.error('Error sending confirmation to user: ' + error);
        }
    );
}

// Function to send the order details to the company
function sendOrderToCompany(orderDetails, userName, userAddress) {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
        to: [{ email: 'orders@company.co.za', name: 'Order Processing Team' }],
        sender: { name: 'Businessdev', email: 'info@businessdev.co.za' },
        subject: 'New Order Received',
        htmlContent: `<h1>New Order Received</h1><p>Customer Name: ${userName}</p><p>Shipping Address: ${userAddress}</p><p>Order Details:</p><ul>${orderDetails}</ul><p>Please process the order accordingly.</p>`
    });

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
        function (data) {
            console.log('Order details sent successfully to the company. Returned data: ' + data);
        },
        function (error) {
            console.error('Error sending order details to the company: ' + error);
        }
    );
}

module.exports = { sendOrderConfirmation, sendOrderToCompany };

// END OF FILE: email.js

//...
app.listen(process.env.PORT || 3000, () => console.log("Server running..."));
