// export async function GET() {
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.API_KEY}`
//   // const url = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${process.env.API_KEY}`;
//   const res = await fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//   const data = await res.json();
 
//   return Response.json({ data });
// }

export async function GET() {
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.API_KEY}`
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${process.env.API_KEY}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json();
 
  return Response.json({ data });
}
