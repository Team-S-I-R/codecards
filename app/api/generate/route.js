import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

export async function POST(req) {
  // const openai = new OpenAI()
  // const data = await req.text()

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel(
    { model: "gemini-1.5-flash",  generationConfig: { responseMimeType: "application/json" }}
  );
  const data = await req.text(); // Parse the JSON body of the incoming request
  
  // const completion = await openai.chat.completions.create({
  //   messages: [
  //     { role: 'system', content: systemPrompt },
  //     { role: 'user', content: data },
  //   ],
  //   model: 'gpt-4o',
  //   response_format: { type: 'json_object' },
  // })

  const completion = await model.generateContent({
    contents: [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "user", parts: [{ text: data }] },
    ],
  });

  // Parse the JSON response from the OpenAI API
  const flashcards = JSON.parse(completion.response.text());
  console.log(flashcards);


  // Return the flashcards as a JSON response
  return NextResponse.json(flashcards.flashcards);
}