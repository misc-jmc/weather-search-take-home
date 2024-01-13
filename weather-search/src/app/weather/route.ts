'use client';

export async function GET() {
  const res = await fetch('https://catfact.ninja/breeds...', {
    headers: {
      'Content-Type': 'application/json',
      // 'API-Key': process.env.WEATHER_API_KEY,
    },
  })
  const data = await res.json();
 
  return Response.json({ data: data.data });
}