# Backend Integration Guide for Auto-Response Email

Since your backend is hosted on Render, you will need to add the following logic to your Node.js/Express application to enable the automated "Thank You" email.

## 1. Prerequisites
Ensure you have `nodemailer` installed in your backend:
```bash
npm install nodemailer
```

## 2. Updated /send-email Route
Replace or update your current POST route with the logic below.

```javascript
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Configure your transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your email provider
    auth: {
        user: 'contact@navabharatha.com',
        pass: 'YOUR_EMAIL_PASSWORD_OR_APP_PASSWORD'
    }
});

app.post('/send-email', async (req, res) => {
    const { name, email, phone, service, message } = req.body;

    try {
        // --- 1. Notify Admin ---
        const adminMailOptions = {
            from: '"Website Contact" <contact@navabharatha.com>',
            to: 'contact@navabharatha.com',
            subject: 'New Website Inquiry',
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`
        };
        await transporter.sendMail(adminMailOptions);

        // --- 2. Auto-Response to User ---
        // Load the HTML template (Image-based design)
        let thankYouHtml = fs.readFileSync(path.join(__dirname, 'thank_you_image_template.html'), 'utf8');
        
        // Personalize the name
        thankYouHtml = thankYouHtml.replace('{{name}}', name);

        const userMailOptions = {
            from: '"Navabharatha" <contact@navabharatha.com>',
            to: email, // The user's email from the form
            subject: 'We\'ve received your message',
            html: thankYouHtml
        };
        await transporter.sendMail(userMailOptions);

        res.status(200).json({ success: true, message: 'Inquiry received and thank you email sent.' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, message: 'Error processing your request.' });
    }
});
```

## 3. Important Notes
- **App Password**: If you are using Gmail, you MUST use an "App Password" instead of your regular password.
- **File Path**: Ensure `thank_you_template.html` is uploaded to the same directory as your backend file on Render.
- **Personalization**: The code uses `.replace('{{name}}', name)` to add the user's name to the email card.
