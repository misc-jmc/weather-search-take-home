'use client';

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { debounce } from '@mui/material/utils';
import { Coordinates } from '../WeatherDisplay/WeatherDisplay';

export type LocationSearchProps = {
  onSelect: (selection: Coordinates) => void;
}

export type LocationData = {
  name: string;
  country?: string;
  state?: string;
} & Coordinates;

const getOptionLabel = (option: LocationData) => {
  return `${option.name}, ${option.country}${option.state ? ',': ''} ${option.state ?? ''}`;
}

const LocationSearch = ({
  onSelect
}: LocationSearchProps) => {
  const [location, setLocation] = React.useState<LocationData | null>(null);
  const [searchVal, setSearchVal] = React.useState('');
  const [locationOptions, setLocationOptions] = React.useState<readonly LocationData[]>([]);

  const searchLocations = React.useMemo(
    () =>
      debounce(
        (
          locSearch: string,
          callback: (results?: readonly LocationData[]) => void,
        ) => {
          fetch(`/LocationSearch/?location=${locSearch}`)
          .then((res) => res.json())
          .then((body) => { callback(body.data) })
        },
        400,
      ),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (searchVal === '') {
      setLocationOptions(location ? [location] : []);
      return undefined;
    }

    searchLocations(searchVal, (results?: readonly LocationData[]) => {
      if(!results) return;

      if (active) {
        let newOptions: readonly LocationData[] = [];

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setLocationOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [location, searchVal, searchLocations]);

  return (
    <Autocomplete
      sx={{ width: 300 }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : getOptionLabel(option)
      }
      options={locationOptions}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={location}
      noOptionsText="No locations"
      onChange={(event: any, newValue: LocationData | null) => {
        setLocationOptions(newValue ? [newValue, ...locationOptions] : locationOptions);
        setLocation(newValue);
        if(newValue) {
          onSelect(newValue);
        }
      }}
      onInputChange={(event, newInputValue) => {
        setSearchVal(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search" fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props} key={`${option.name}-${option.lat}-${option.lon}`}>
            <Grid container alignItems="center">
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {getOptionLabel(option)}
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}

export default LocationSearch;