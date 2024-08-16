import { NextResponse } from 'next/server';
import axios from 'axios';

const TEXTRAZOR_API_KEY = process.env.TEXTRAZOR_API_KEY;

async function summarizeText(text) {
  try {
    const response = await axios.post('https://api.textrazor.com', new URLSearchParams({
      extractors: 'entities,topics',
      text: text,
    }), {
      headers: {
        'x-textrazor-key': TEXTRAZOR_API_KEY,
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    const topics = response.data.response.topics.map(topic => topic.label);
    return topics.join(', ');
  } catch (error) {
    console.error('error with text summarization, blame bishtshaurya314@gmail.com:', error);
    throw new Error('couldnt summarize text, blame bishtshaurya314@gmail.com:');
  }
}

export async function POST(req) {
  try {
    const { transcript } = await req.json();
    const summary = await summarizeText(transcript);
    return NextResponse.json({ summary }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return new NextResponse(JSON.stringify({ error: { message: error.message } }), { status: 500 });
  }
}