import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';

const DatePickerInput = ({ value, onChange, name, placeholder }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        className="outline-none"
        placeholder={placeholder}
        value={value ? dayjs(value) : null}
        onChange={(date) => {
          onChange(date?.toISOString());
        }}
        label={placeholder}
        slotProps={{
          textField: {
            name,
            sx: {
              outline: 'none',
              width: '100%',
              height: '30px',
              '& .MuiOutlinedInput-input': {
                boxShadow: 'none',
              },
              '& .MuiInputBase-root': {
                borderRadius: '12px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                height: '2.75rem',
              },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#DBDCDE',
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerInput;
