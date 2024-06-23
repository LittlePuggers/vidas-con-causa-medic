import {SetStateAction, useState} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  styled,
} from '@mui/material';
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, {Dayjs} from 'dayjs';

interface NewInstanceFormProps {
  open: boolean;
  handleClose: () => void;
  medicineName2: string;
}

const RowBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const NewInstanceForm = ({
  open,
  handleClose,
  medicineName2,
}: NewInstanceFormProps) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs('MM/DD/YYYY'));

  const [qty, setQty] = useState('');

  const handleQty = (event: {target: {value: SetStateAction<string>}}) => {
    setQty(event.target.value);
  };

  const [unit, setUnit] = useState('');

  const handleUnit = (event: SelectChangeEvent) => {
    setUnit(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          sx: {padding: '1rem 4rem'},
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>{medicineName2}</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <DialogContentText>Fecha de caducidad</DialogContentText>
            <DatePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>
          <RowBox>
            <Box>
              <DialogContentText>Cantidad</DialogContentText>
              <TextField
                id="quantity"
                value={qty}
                // label="Cantidad"
                // variant="outlined"
                type="number"
                sx={{width: '100px'}}
                onChange={handleQty}
              />
            </Box>
            <Box>
              <DialogContentText>Unidad</DialogContentText>
              <Select
                // labelId="demo-simple-select-label"
                id="unit"
                value={unit}
                // label="unit"
                onChange={handleUnit}
                sx={{width: '100px'}}
              >
                <MenuItem value={'tablets'}>Tabletas</MenuItem>
                <MenuItem value={'grams'}>Gramos</MenuItem>
                <MenuItem value={'mililiters'}>Mililitros</MenuItem>
              </Select>
            </Box>
          </RowBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color: 'gray'}}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#209EBB',
              color: 'white',
              '&:hover': {
                backgroundColor: '#19829A',
              },
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};
