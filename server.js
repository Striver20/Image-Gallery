const express = require("express");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
const OpenAI = require("openai");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());
config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res
      .status(400)
      .json({ error: "Message is required in the request body." });
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userMessage },
      ],
    });

    const reply = response.data.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
