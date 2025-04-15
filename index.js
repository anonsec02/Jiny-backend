const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const accountSid = "AC611da1bff4ba419a1d59a0415234ce5e";
const authToken = "fdf433f6c4f3e66d956ac3ea773f4c7d";
const twilioNumber = "+1 (443) 233-5512";

const client = twilio(accountSid, authToken);

app.post("/send", async (req, res) => {
  const { number, message } = req.body;

  try {
    await client.messages.create({
      body: message,
      from: twilioNumber,
      to: number,
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Twilio error:", error);
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});