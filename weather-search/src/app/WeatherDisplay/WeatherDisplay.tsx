'use client';

import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
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

  useEffect(() => {
      fetch(`/WeatherDisplay?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((res) => setWeatherData(res.data));
  }, [lat, lon]);

  return (
  <Grid container wrap='nowrap' gap={8} sx={{my: 1}}>
    <Grid container direction='column' flexShrink='6' rowGap={1}>
      <Box>{weatherData?.weather?.length > 0 ? weatherData.weather[0].description : ''}</Box>
      <Box>Feels Like: {weatherData?.main?.feels_like}</Box>
      <Box>Low: {weatherData?.main?.temp_min}</Box>
      <Box>High: {weatherData?.main?.temp_max}</Box>
    </Grid>
    <Grid container>
      <pre>
        {JSON.stringify(weatherData, null, 2)}
      </pre>
    </Grid>
  </Grid>
  )
}