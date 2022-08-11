import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function SearchDateTimeComponent({myDate, changeDate}) {
  const today = new Date();
  const nextDate = today.setDate(today.getDate() + 5);
  return (
    <div className='Search'>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Select Date and Time"
          inputFormat='yyyy/MM/dd HH:mm:ss'
          value={myDate}
          onChange={ date =>changeDate(date)}
          disablePast={true}
          miniDate={today}
          maxDate={nextDate}
        />
      </LocalizationProvider>
    </div>
  );
}
