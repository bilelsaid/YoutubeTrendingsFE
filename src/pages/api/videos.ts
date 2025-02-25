// pages/api/videos.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.YOUTUBE_API_KEY;
const MAX_RESULTS = 20;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const region = (req.query.region as string) || 'TN';
  const category = req.query.category as string;
  
  let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=${region}&maxResults=${MAX_RESULTS}&key=${API_KEY}`;
  if (category) {
    url += `&videoCategoryId=${category}`;
  }
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
