const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
const port = process.env.PORT || 3000;

// إعداد CORS
app.use(cors());
app.use(bodyParser.json());

// بيانات Twilio من حسابك
const accountSid = 'AC611da1bff4ba419a1d59a0415234ce5e';
const authToken = 'fdf433f6c4f3e66d956ac3ea773f4c7d';
const fromNumber = '+1 (443) 233-5512';

const client = twilio(accountSid, authToken);

// عند فتح الموقع مباشرة
app.get("/", (req, res) => {
  res.send("Jiny SMS Backend is running.");
});

// عند استقبال طلب إرسال رسالة
app.post("/send-sms", (req, res) => {
  const { to, message } = req.body;

  client.messages
    .create({
      body: message,
      from: fromNumber,
      to: to,
    })
    .then((msg) => res.json({ success: true, sid: msg.sid }))
    .catch((err) => res.status(500).json({ success: false, error: err.message }));
});

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
