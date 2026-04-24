import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const handleChat = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const systemInstruction = `You are a helpful and expert financial advisor for the Expense Manager application.
Your ONLY purpose is to answer questions related to personal finance, investments, budgeting, saving money, getting returns, and wealth management.
If a user asks a question that is NOT related to finance, investments, or money management, you MUST politely decline to answer and remind them that you are a financial assistant.
Do not provide coding advice, general knowledge outside of finance, or participate in non-financial conversations. Keep your answers concise, practical, and easy to understand.
Do not use markdown headers (# or ##) in your response, keep it as plain text paragraphs or bullet points to fit nicely in a chat bubble.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    res.status(200).json({ message: response.text });
  } catch (error) {
    console.error("Chatbot Error:", error);
    
    if (error.status === 503) {
      return res.status(503).json({ 
        message: "The financial advisor is currently experiencing high demand. Please try again in a few moments." 
      });
    }

    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};
