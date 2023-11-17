import styles from '@s/projects/check24hc/main.module.scss';

import { Model } from '@m/Check24hc';

import { Components } from '@t/check24hc';
import SearchForm = Components.Schemas.Form.Search;

import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { deDE } from '@mui/x-date-pickers/locales';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs, { Dayjs } from 'dayjs';

import Counter from './Counter';

type Properties = {
  submitCallback: (params: SearchForm) => Promise<void>;
  model: Model;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Form = ({ submitCallback, model }: Properties) => {
  // region Form state

  const [departureAirports, setDepartureAirports] = useState<string[]>([]);

  const [countChildren, setCountChildren] = useState<number>(0);
  const [countAdults, setCountAdults] = useState<number>(1);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [duration, setDuration] = useState<string>('');

  const [earliestDepartureDate, setEarliestDepartureDate] =
    useState<Dayjs | null>(null);
  const [latestReturnDate, setLatestReturnDate] = useState<Dayjs | null>(null);

  // endregion Form state

  const [airportCodesCity, setAirportCodesCity] =
    useState<Components.Schemas.APIResponse.AirportCodeCity>();

  const handleAirportChange = (
    event: SelectChangeEvent<typeof departureAirports>
  ) => {
    const {
      target: { value },
    } = event;
    setDepartureAirports(typeof value === 'string' ? value.split(',') : value);
  };
  const handleDepartureDateChange = (
    date: Dayjs | null,
    earliestDepartureDateChanged: boolean
  ) => {
    if (date === null) return;

    if (earliestDepartureDateChanged) {
      if (latestReturnDate === null) {
        setEarliestDepartureDate(date);
        setErrorMessage('');
        return;
      }

      if (date.isAfter(latestReturnDate)) {
        setErrorMessage(
          'Earliest departure date cannot be after latest return'
        );
        return;
      }

      if (Math.abs(date.diff(latestReturnDate, 'days')) < Number(duration)) {
        setErrorMessage(
          'Your trip is shorter than the duration you specified.'
        );
        setLatestReturnDate(date);
        return;
      }

      setErrorMessage('');
      setEarliestDepartureDate(date);
      return;
    }

    if (earliestDepartureDate === null) {
      setLatestReturnDate(date);
      setErrorMessage('');
      return;
    }

    if (date.isBefore(earliestDepartureDate)) {
      setErrorMessage('Latest return date cannot be before earliest departure');
      return;
    }

    if (Math.abs(date.diff(earliestDepartureDate, 'days')) < Number(duration)) {
      setErrorMessage('Your trip is shorter than the duration you specified.');
      setLatestReturnDate(date);
      return;
    }

    setErrorMessage('');
    setLatestReturnDate(date);
    return;
  };

  const handleDurationChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value: string = event.target.value;
    const regex: RegExp = /^[0-9\b]+$/;
    if (value !== '' && !regex.test(value)) return;

    if (
      !(earliestDepartureDate === null || latestReturnDate === null) &&
      Number(value) >
        Math.abs(earliestDepartureDate.diff(latestReturnDate, 'days'))
    ) {
      setErrorMessage(
        'Your trip is longer than the difference of days from your departure date to your return date.'
      );
      setDuration(value);
      return;
    }

    setDuration(value);
    return;
  };

  async function getAirportCodesCity() {
    model
      .sendGETReqForAirportCodeCities()
      .then((res: Components.Schemas.APIResponse.AirportCodeCity) => {
        setAirportCodesCity((prev) => res);
        return;
      });

    return;
  }

  useEffect(() => {
    getAirportCodesCity();
  }, []);

  const test = () => {
    const availableDepartureAirports = [
      { code: 'MUC', name: 'Munich' },
      { code: 'FRA', name: 'Frankfurt' },
    ];

    return availableDepartureAirports.map((airport) => (
      <MenuItem key={airport.code} value={airport.code}>
        <Checkbox checked={departureAirports.indexOf(airport.code) > -1} />
        <ListItemText primary={airport.name} />
      </MenuItem>
    ));
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={2}>
            <Stack
              direction={'row'}
              spacing={2}
              sx={{
                alignItems: 'center',
              }}
            >
              <Stack
                direction={'row'}
                sx={{
                  width: '100%',
                }}
                spacing={0}
              >
                <InputLabel id='departure-airport-label'>
                  Departure airport
                </InputLabel>
                <Select
                  id='departure-airport'
                  multiple
                  sx={{ width: '100%' }}
                  label='Departure airport'
                  label-id='departure-airport-label'
                  value={departureAirports}
                  MenuProps={MenuProps}
                  onChange={handleAirportChange}
                  renderValue={(selected) => (
                    <Box
                      sx={{
                        display: 'flex',
                        height: '90%',
                        flexWrap: 'wrap',
                        gap: 0.5,
                      }}
                    >
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {test()}
                </Select>
              </Stack>
              <Counter
                label='Children'
                value={countChildren}
                setValue={setCountChildren}
                minValue={0}
                maxValue={-1}
              />
              <Counter
                label='Adults'
                value={countAdults}
                setValue={setCountAdults}
                minValue={1}
                maxValue={-1}
              />
            </Stack>
            <Stack
              direction={'row'}
              spacing={2}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <TextField
                sx={{ width: '11rem' }}
                label='Duration (days)'
                value={duration}
                onChange={handleDurationChange}
                type='number'
                variant='outlined'
              />
              <Typography>between</Typography>
              <DatePicker
                sx={{ width: '15rem' }}
                label='Earliest departure'
                value={earliestDepartureDate}
                format='DD.MM.YYYY'
                onChange={(value: Dayjs | null) =>
                  handleDepartureDateChange(value, true)
                }
              />
              <Typography>and</Typography>
              <DatePicker
                sx={{ width: '15rem' }}
                label='Latest return'
                value={latestReturnDate}
                format='DD.MM.YYYY'
                onChange={(value: Dayjs | null) =>
                  handleDepartureDateChange(value, false)
                }
              />
            </Stack>
            <Button
              sx={{ minWidth: '50.5rem', alignSelf: 'center' }}
              variant='contained'
              onClick={() => {
                setErrorMessage('');

                if (earliestDepartureDate === null) {
                  setErrorMessage('Earliest departure date is not set.');
                  return;
                }
                if (earliestDepartureDate.isAfter(latestReturnDate)) {
                  setErrorMessage(
                    'Earliest departure date cannot be after latest return date.'
                  );
                  return;
                }

                if (latestReturnDate === null) {
                  setErrorMessage('Latest return date is not set.');
                  return;
                }
                if (latestReturnDate.isBefore(earliestDepartureDate)) {
                  setErrorMessage(
                    'Latest return date cannot be before earliest departure date.'
                  );
                  return;
                }

                if (duration === '') {
                  setErrorMessage('Duration is not set.');
                  return;
                }
                if (Number(duration) < 1) {
                  setErrorMessage('Duration time is invalid.');
                  return;
                }
                if (
                  Number(duration) >
                  Math.abs(earliestDepartureDate.diff(latestReturnDate, 'days'))
                ) {
                  setErrorMessage(
                    'Your trip is longer than the difference of days from your departure date to your return date.'
                  );
                  return;
                }

                if (countAdults < 1) {
                  setErrorMessage('At least one adult is required.');
                  return;
                }

                if (departureAirports.length === 0) {
                  setErrorMessage(
                    'At least one departure airport is required.'
                  );
                  return;
                }

                submitCallback({
                  duration: Number(duration),
                  earliestdeparturedate:
                    earliestDepartureDate?.format('YYYY-MM-DD'),
                  latestreturndate: latestReturnDate?.format('YYYY-MM-DD'),
                  countchildren: countChildren,
                  countadults: countAdults,
                  departureairports: departureAirports,
                });
              }}
            >
              Search
            </Button>
          </Stack>
        </LocalizationProvider>
        <div className={styles.search_form_error_message}>{errorMessage}</div>
      </FormControl>
    </div>
  );
};

export default Form;
