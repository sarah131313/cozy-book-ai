// server/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();



const app = express();

// Allow requests from your frontend (adjust origin if needed)
app.use(cors());
app.use(express.json());

app.post('/api/recommendations', async (req, res) => {
  const { userInput } = req.body;

  // Your AI prompt as given
  const messages = [
    {
      role: "system",
      content: `You are an expert book recommendation assistant. Regardless of what the user says, you will always provide **book** recommendations only from 3 to 6 books. Do not provide recommendations for movies, music, or any other media. When the user input includes other media types like movies, politely steer the response to book recommendations related to their input. Give me a JSON array of of 6 books, Do not include any text outside the JSON. 
Each object must have: 
- title 
- author 
- rating (out of 5) 
- summary

Always keep the recommendations relevant to the user's input theme, but strictly recommend books only.just recommendations`
    },
    { role: "user", content: userInput }
  ];

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Send back the AI response to frontend
    res.json(response.data.choices[0].message.content);
  } catch (error) {
    console.error("OpenRouter API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get recommendations" });
  }
});

// Start server on port 4000 (or environment PORT)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
