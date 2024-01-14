import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=imperial`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json();
 
  return Response.json({ data });
}
