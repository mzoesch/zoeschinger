import React from 'react';

import { Add, Remove } from '@mui/icons-material';
import { Fab, Stack, Typography } from '@mui/material';

export default function Counter({
  label,
  value,
  setValue,
  minValue,
  maxValue,
}: {
  label: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  minValue: number;
  maxValue: number;
}) {
  return (
    <Stack direction='row' sx={{ alignItems: 'center' }}>
      <Typography
        variant='subtitle1'
        sx={{ marginRight: '20px', minWidth: '80px' }}
      >
        {label}
      </Typography>
      <Fab
        disabled={value <= minValue}
        size='small'
        color='primary'
        aria-label='sub'
        onClick={() => {
          setValue(value - 1);
        }}
      >
        <Remove />
      </Fab>
      <Typography variant='body1' sx={{ marginX: '10px' }}>
        {value}
      </Typography>
      <Fab
        disabled={maxValue !== -1 && value >= maxValue}
        size='small'
        color='primary'
        aria-label='add'
        onClick={() => {
          setValue(value + 1);
        }}
      >
        <Add />
      </Fab>
    </Stack>
  );
}
