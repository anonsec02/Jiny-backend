const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

// Twilio credentials
const accountSid = 'AC611da1bff4ba419a1d59a0415234ce5e';
const authToken = 'fdf433f6c4f3e66d956ac3ea773f4c7d';
const client = twilio(accountSid, authToken);

const twilioNumber = '+1 (443) 233-5512';

app.use(cors());
app.use(bodyParser.json());

app.post('/send-sms', async (req, res) => {
  const { to, message } = req.body;

  try {
    const msg = await client.messages.create({
      body: message,
      from: twilioNumber,
      to: to
    });

    res.status(200).json({ success: true, sid: msg.sid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Jiny backend running on port ${port}`);
});
