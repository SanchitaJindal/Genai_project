import { GoogleGenAI } from "@google/genai";


const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const gemini = new GoogleGenAI({ apiKey: API_KEY });

if (!API_KEY) {
  throw new Error('Missing Gemini API key. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file');
}



export async function generateMotivation(mood: string): Promise<string> {
  try {
    const prompt = `Generate a short, encouraging, and motivational quote for someone who is ${mood}. 
    The quote should be uplifting and provide practical advice or perspective. 
    Keep it under 2 sentences and make it feel personal and relatable.`;

    const response = await gemini.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const result = response.text;
    if (!result) {
      throw new Error('No response from Gemini API');
    }
    return result
  } catch (error) {
    console.error('Error generating motivation:', error);
    throw error;
  }
}; 