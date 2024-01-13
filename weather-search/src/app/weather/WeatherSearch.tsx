import LocationSearch from "./_LocationSearch";

export default async function WeatherSearch() {

  const res = await fetch(`${process.env.HOST}/weather`);
  const resJson = await res.json();
  console.log(resJson);

  return (
    <main>
      <LocationSearch />
    </main>
  )
}