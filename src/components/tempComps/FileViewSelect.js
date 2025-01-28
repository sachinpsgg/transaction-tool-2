import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ControlledOpenSelect({ onSelectionChange }) {
  const [age, setAge] = React.useState('837');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setAge(value);
    if (onSelectionChange) {
      onSelectionChange(value);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
          sx={{
            height: 50,
            width: 60,
            marginRight: '20px',
            border: 'none',
            backgroundColor: 'transparent',
            '& .MuiSelect-select': {
              padding: 0,
              textAlign: 'center',
              fontSize: '14px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiSvgIcon-root': {
              fontSize: '1.25 rem',
            },
          }}>
          <MenuItem value="835">835</MenuItem>
          <MenuItem value="837">837</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
