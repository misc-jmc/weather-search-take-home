'use client';

import { Grid } from "@mui/material";
import { useState } from "react";

export type Coordinates = {
  lat: string;
  lon: string;
}

export default function WeatherSearch({
  lat,
  lon
}: Coordinates) {
  const [weatherData, setWeatherData] = useState<any>();

  const res = fetch(`/WeatherDisplay?lat=${lat}&lon=${lon}`)
  .then((res) => res.json())
  .then((res) => setWeatherData(res.data));

  return (
  <div>
    <div>
      {weatherData?.main?.temp}
    </div>
    <div>
      {JSON.stringify(weatherData)}
    </div>
  </div>
  )
}