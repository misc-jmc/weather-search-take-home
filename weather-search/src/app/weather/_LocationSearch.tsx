'use client';

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';

export type LocationData = {
  name: string;
  lat?: string;
  lon?: string;
}

export default function LocationSearch() {
  const [location, setLocation] = React.useState<LocationData | null>(null);
  const [searchVal, setSearchVal] = React.useState('');
  const [locationOptions, setLocationOptions] = React.useState<readonly LocationData[]>([]);

  const searchLocations = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly LocationData[]) => void,
        ) => {
          fetch(`/weather/${searchVal}`)
          .then((res) => res.json())
          .then((body) => { callback(body.data) });
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

    searchLocations({ input: searchVal }, (results?: readonly LocationData[]) => {
      if (active) {
        let newOptions: readonly LocationData[] = [];

        if (searchVal) {
          newOptions = [{name: searchVal}];
        }

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
        typeof option === 'string' ? option : option.name
      }
      filterOptions={(x) => x}
      options={locationOptions}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={location}
      noOptionsText="No locations"
      onChange={(event: any, newValue: LocationData | null) => {
        setLocationOptions(newValue ? [newValue, ...locationOptions] : locationOptions);
        setLocation(location);
      }}
      onInputChange={(event, newInputValue) => {
        setSearchVal(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search" fullWidth />
      )}
      renderOption={(props, option) => {
        // const matches =
        //   option.structured_formatting.main_text_matched_substrings || [];

        // const parts = parse(
        //   option.structured_formatting.main_text,
        //   matches.map((match: any) => [match.offset, match.offset + match.length]),
        // );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {option.name}
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}