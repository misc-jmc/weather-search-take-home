import { NextRequest } from "next/server";

const headers = {
  'Content-Type': 'application/json',
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const location = searchParams.get('query');
  const coords = location?.trim().split(',');
  const nameUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.API_KEY}&limit=5`;
  const zipUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${location}&appid=${process.env.API_KEY}`;

  const fetches = [];

  fetches.push(
    fetch(nameUrl, {headers})
    .then((res: Response) => res.json())
  );

  fetches.push(
    fetch(zipUrl, {headers})
    .then((res: Response) => res.json())
  );

  if(coords && coords.length === 2) {
    const coordUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords[0]}&lon=${coords[1]}&appid=${process.env.API_KEY}`;
    fetches.push(
      fetch(coordUrl, {headers})
      .then((res: Response) => res.json())
    );
  }

  const res = await Promise.all(fetches);
  const data = res.flat().filter(l => l.name);

  return Response.json({ data });
}
