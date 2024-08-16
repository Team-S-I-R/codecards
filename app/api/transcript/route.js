import { NextResponse } from 'next/server';
import axios from 'axios';
import { summarizeText } from '../summarize/route';
import { youtubeDl } from "youtube-dl-exec";
import { AssemblyAI } from 'assemblyai';
import { YoutubeTranscript } from 'youtube-transcript';

const ak= process.env.ASSEMBLYAI_API_KEY;
const aaiClient = new AssemblyAI({ baseURL: 'https://api.assemblyai.com/v2', apiKey: ak });

async function magic(videoUrl) {
  console.log("videoUrl: ", videoUrl);
  try {
    const return_value = await YoutubeTranscript.fetchTranscript(videoUrl);
    // Concatenate text values from the transcript data
    if (return_value && Array.isArray(return_value)) {
      const concatenatedText = return_value.map(item => item.text).join(' ');
      return concatenatedText;
    } else {
      throw new Error('Invalid transcript data');
    }
  } catch (error) {
    console.error('Failed to get transcript:', error);
    throw error;  // Ensure errors are propagated
  }
}

async function getYoutubetrancript(videoUrl) {
  try {
    const concatenatedText = await magic(videoUrl);
    return concatenatedText;
  } catch (error) {
    console.error('Error getting the transcript:', error);
    throw new Error('Failed to get transcript');
  }
}

export async function POST(req) {
  try {
    const videoUrl = await req.text();
    const concatenatedText = await getYoutubetrancript(videoUrl);
    // const summarizedtext = await summarizeText(concatenatedText);
    // console.log("concatenatedText: ", concatenatedText);

    return NextResponse.json({ concatenatedText }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return new NextResponse(JSON.stringify({ error: { message: error.message } }), { status: 500 });
  }
}
