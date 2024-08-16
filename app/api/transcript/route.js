import { NextResponse } from 'next/server';
import axios from 'axios';

const ASSEMBLYAI_API_KEY= process.env.ASSEMBLYAI_API_KEY;

async function getYoutubetrancript(videoUrl) {
  try {
    const response = await axios.post('https://api.assemblyai.com/v2/transcript', {
      audio_url: videoUrl,
    }, {
      headers: {
        authorization: ASSEMBLYAI_API_KEY,
        'content-type': 'application/json',
      },
    });
    const transcriptId =response.data.id;
    let transcript = '';
    let status= 'processing';
    while (status === 'processing') {
      const result = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
        headers: {
          authorization: ASSEMBLYAI_API_KEY,
        },
      });

      status = result.data.status;
      if (status === 'completed') {
        transcript = result.data.text;
      }
    }
    return transcript;
  } catch (error) {
    console.error('error getting the transcript:', error);
    throw new Error('failed to get transcript');
  }
}

export async function POST(req) {
  try {
    const { videoUrl } = await req.json();
    const transcript = await getYoutubetrancript(videoUrl);
    return NextResponse.json({ transcript }, { status:200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return new NextResponse(JSON.stringify({ error: { message: error.message } }), { status: 500 });
  }
}
