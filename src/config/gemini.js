import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-latest",
  generationConfig: {
    temperature: 0.9,
    topP: 1,
    topK: 32,
    maxOutputTokens: 4096,
  },
});

async function run(prompt) {
  try {
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }]
    });
    return result.response.text();
  } catch (error) {
    console.error("Full error:", error);
    throw new Error(`API request failed: ${error.message}`);
  }
}

export default run;