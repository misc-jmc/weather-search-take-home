export default async function WeatherSearch() {

  const res = await fetch(`${process.env.HOST}/weather`);
  const resJson = await res.json();
  console.log(resJson.data);

  return (
    <main>
      <p>{resJson.data.total}</p>
    </main>
  )
}