import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(req) {
  const body = await req.json();
  const { prompt, instructions, contentGen } = body;

  const fullPrompt = contentGen
    ? `Write a detailed blog post. ${instructions}\n\n${prompt}`
    : `Rephrase this content. ${instructions}\n\n${prompt}`;

  try {

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Gemini Error:", error);
    // Provide a more informative error message to the client if possible
    let errorMessage = "Failed to generate content";
    if (error.message.includes("404 Not Found") && error.message.includes("models/gemini-pro")) {
      errorMessage = "AI model not found or accessible. Please ensure you're using a supported model like 'gemini-1.5-flash' or 'gemini-1.5-pro' and your API key is correct.";
    } else if (error.message.includes("API key not valid")) {
      errorMessage = "Invalid Google API Key. Please check your API key.";
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}