'use client';

import { useState } from 'react';
import LocationSearch from './LocationSearch/LocationSearch';
import WeatherDisplay, { Coordinates } from './WeatherDisplay/WeatherDisplay';
import styles from './page.module.css'
import { Box, Grid } from '@mui/material';

export default function Home() {
  const [coords, setCoords] = useState<Coordinates>();

  return (
    <main className={styles.main}>
      <Box width='100%'>
        <Grid container flexDirection='column'>
          <Grid>
            <LocationSearch onSelect={(selection: Coordinates) => setCoords(selection)} />
          </Grid>
          <Grid>
            {coords && <WeatherDisplay  lat={coords.lat} lon={coords.lon} />}
          </Grid>
        </Grid>
      </Box>
    </main>
  )
}
