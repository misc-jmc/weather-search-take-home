import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const location = searchParams.get('location');
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.API_KEY}&limit=5`;
  
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json();
 
  return Response.json({ data });
}
